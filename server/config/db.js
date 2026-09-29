import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const isCloudDb = Boolean(
  process.env.DB_SSL === 'true' || 
  process.env.DB_HOST?.includes('tidbcloud.com') ||
  process.env.DB_HOST?.includes('aivencloud.com')
);

export const DB_CONFIG = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'admin',
  port: Number(process.env.DB_PORT) || 3306,
  database: process.env.DB_NAME || 'codevidya_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ...(isCloudDb ? { ssl: { minVersion: 'TLSv1.2', rejectUnauthorized: true } } : {})
};

let pool = null;

export async function initDatabase() {
  try {
    // 1. Ensure database exists (for local or privileged cloud)
    if (!isCloudDb) {
      try {
        const adminConn = await mysql.createConnection({
          host: DB_CONFIG.host,
          user: DB_CONFIG.user,
          password: DB_CONFIG.password,
          port: DB_CONFIG.port
        });
        await adminConn.query(`CREATE DATABASE IF NOT EXISTS \`${DB_CONFIG.database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
        await adminConn.end();
      } catch (err) {
        console.log(`ℹ️ [DB Check]: Database existence check skipped: ${err.message}`);
      }
    }

    // 2. Initialize connection pool
    pool = mysql.createPool(DB_CONFIG);

    // 3. Test connection
    const testConn = await pool.getConnection();
    console.log(`✅ [MySQL Connected]: Active connection established to MySQL at ${DB_CONFIG.host}:${DB_CONFIG.port}/${DB_CONFIG.database}`);
    testConn.release();

    // 4. Ensure tables exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS \`users\` (
        \`id\` INT AUTO_INCREMENT PRIMARY KEY,
        \`name\` VARCHAR(100) NOT NULL,
        \`email\` VARCHAR(150) NOT NULL UNIQUE,
        \`phone\` VARCHAR(20) NOT NULL,
        \`password_hash\` VARCHAR(255) NOT NULL,
        \`role\` ENUM('student', 'instructor', 'admin') DEFAULT 'student',
        \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX \`idx_user_email\` (\`email\`),
        INDEX \`idx_user_phone\` (\`phone\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS \`orders\` (
        \`id\` INT AUTO_INCREMENT PRIMARY KEY,
        \`order_id\` VARCHAR(50) NOT NULL UNIQUE,
        \`user_email\` VARCHAR(150) NOT NULL,
        \`course_id\` VARCHAR(50) NOT NULL,
        \`amount\` DECIMAL(10, 2) NOT NULL,
        \`status\` ENUM('PENDING', 'SUCCESS', 'FAILED') DEFAULT 'SUCCESS',
        \`payment_method\` VARCHAR(50) DEFAULT 'UPI',
        \`transaction_id\` VARCHAR(100) NULL,
        \`coupon_applied\` VARCHAR(30) NULL,
        \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX \`idx_order_user\` (\`user_email\`),
        INDEX \`idx_order_course\` (\`course_id\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS \`certificates\` (
        \`id\` INT AUTO_INCREMENT PRIMARY KEY,
        \`cert_id\` VARCHAR(50) NOT NULL UNIQUE,
        \`student_name\` VARCHAR(150) NOT NULL,
        \`course_id\` VARCHAR(50) NOT NULL,
        \`course_title\` VARCHAR(200) NOT NULL,
        \`score_percentage\` INT NOT NULL,
        \`issue_date\` VARCHAR(50) NOT NULL,
        \`hash_signature\` VARCHAR(64) NOT NULL,
        \`status\` ENUM('VERIFIED_ACTIVE', 'REVOKED') DEFAULT 'VERIFIED_ACTIVE',
        \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX \`idx_cert_id\` (\`cert_id\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS \`course_progress\` (
        \`id\` INT AUTO_INCREMENT PRIMARY KEY,
        \`user_email\` VARCHAR(150) NOT NULL,
        \`course_id\` VARCHAR(50) NOT NULL,
        \`lecture_id\` VARCHAR(50) NOT NULL,
        \`completed\` BOOLEAN DEFAULT TRUE,
        \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY \`unique_user_lecture\` (\`user_email\`, \`course_id\`, \`lecture_id\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    return pool;
  } catch (error) {
    console.error(`❌ [MySQL Connection Error]: Could not connect to MySQL server (${error.message})`);
    throw error;
  }
}

export function getPool() {
  if (!pool) {
    throw new Error('MySQL pool is not initialized. Please ensure MySQL service is running.');
  }
  return pool;
}

// Strictly pure MySQL database operations (Zero mock / zero hidden memory DB)
export const db = {
  isMySql: () => true,

  async findUserByEmail(email) {
    const p = getPool();
    const [rows] = await p.query('SELECT * FROM users WHERE email = ? LIMIT 1', [email]);
    return rows[0] || null;
  },

  async findUserByPhone(phone) {
    const p = getPool();
    const [rows] = await p.query('SELECT * FROM users WHERE phone = ? LIMIT 1', [phone]);
    return rows[0] || null;
  },

  async createUser({ name, email, phone, password_hash, role = 'student' }) {
    const p = getPool();
    const [result] = await p.query(
      'INSERT INTO users (name, email, phone, password_hash, role) VALUES (?, ?, ?, ?, ?)',
      [name, email, phone, password_hash, role]
    );
    return { id: result.insertId, name, email, phone, role };
  },

  async createOrder({ order_id, user_email, course_id, amount, status = 'SUCCESS', payment_method = 'UPI', coupon_applied = null }) {
    const p = getPool();
    const [result] = await p.query(
      'INSERT INTO orders (order_id, user_email, course_id, amount, status, payment_method, coupon_applied) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [order_id, user_email, course_id, amount, status, payment_method, coupon_applied]
    );
    return { id: result.insertId, order_id, user_email, course_id, amount, status };
  },

  async getUserUnlockedSheets(user_email) {
    const p = getPool();
    const [rows] = await p.query(
      "SELECT DISTINCT course_id FROM orders WHERE user_email = ? AND status = 'SUCCESS'",
      [user_email]
    );
    return rows.map((r) => r.course_id);
  },

  async issueCertificate({ cert_id, student_name, course_id, course_title, score_percentage, issue_date, hash_signature }) {
    const p = getPool();
    const [result] = await p.query(
      'INSERT INTO certificates (cert_id, student_name, course_id, course_title, score_percentage, issue_date, hash_signature, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [cert_id, student_name, course_id, course_title, score_percentage, issue_date, hash_signature, 'VERIFIED_ACTIVE']
    );
    return { id: result.insertId, cert_id, student_name, course_id, course_title, score_percentage, issue_date, hash_signature, status: 'VERIFIED_ACTIVE' };
  },

  async verifyCertificate(cert_id) {
    const p = getPool();
    const [rows] = await p.query('SELECT * FROM certificates WHERE cert_id = ? LIMIT 1', [cert_id]);
    return rows[0] || null;
  },

  async getUserCertificates(student_name) {
    const p = getPool();
    const [rows] = await p.query('SELECT * FROM certificates WHERE student_name = ?', [student_name]);
    return rows;
  },

  async getAllTablesSummary() {
    const p = getPool();
    const [users] = await p.query('SELECT COUNT(*) as count FROM users');
    const [orders] = await p.query('SELECT COUNT(*) as count FROM orders');
    const [certificates] = await p.query('SELECT COUNT(*) as count FROM certificates');
    return {
      users: users[0].count,
      orders: orders[0].count,
      certificates: certificates[0].count
    };
  }
};
