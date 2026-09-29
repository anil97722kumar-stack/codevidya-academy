import express from 'express';
import { getPool } from '../config/db.js';

const router = express.Router();

// Get live database tables overview directly from MySQL
router.get('/overview', async (req, res) => {
  try {
    const pool = getPool();

    const [users] = await pool.query('SELECT id, name, email, phone, role, created_at FROM users LIMIT 50');
    const [orders] = await pool.query('SELECT * FROM orders LIMIT 50');
    const [certificates] = await pool.query('SELECT * FROM certificates LIMIT 50');
    const [progress] = await pool.query('SELECT * FROM course_progress LIMIT 50');

    return res.json({
      success: true,
      databaseType: 'MySQL 8.0 (Active & Visible)',
      databaseName: 'codevidya_db',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 3306,
      tables: {
        users: { count: users.length, records: users },
        orders: { count: orders.length, records: orders },
        certificates: { count: certificates.length, records: certificates },
        course_progress: { count: progress.length, records: progress }
      },
      schemaPath: 'server/schema.sql'
    });
  } catch (error) {
    console.error('MySQL database inspector error:', error);
    return res.status(500).json({ success: false, message: 'Failed to inspect MySQL database: ' + error.message });
  }
});

export default router;
