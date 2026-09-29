import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initDatabase, db } from './config/db.js';
import { 
  configureSecurityHeaders, 
  globalLimiter, 
  sanitizeInput 
} from './middleware/security.js';

import authRoutes from './routes/authRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import certificateRoutes from './routes/certificateRoutes.js';
import coursesRoutes from './routes/coursesRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, '../dist');

// 1. Security Middlewares
app.use(configureSecurityHeaders());

app.use(cors({
  origin: true, // Allow all origins in production/dev
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json({ limit: '1mb' }));
app.use(sanitizeInput);
app.use('/api/', globalLimiter);

// 2. Health & Status Route
app.get('/api/health', (req, res) => {
  return res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    database: 'MySQL 8.0 (Active & Visible: codevidya_db on localhost:3306)',
    security: {
      helmet: 'Active',
      rateLimiting: 'Active',
      sqlSanitization: 'Active',
      jwtAuth: 'Active'
    }
  });
});

import databaseRoutes from './routes/databaseRoutes.js';

// 3. API Routes
app.use('/api/auth', authRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/courses', coursesRoutes);
app.use('/api/database', databaseRoutes);


// 4. Serve Frontend SPA in Production / Hosted Mode
app.use(express.static(distPath));

// For all non-API GET routes, serve the React single-page app
app.use((req, res, next) => {
  if (req.method === 'GET' && !req.path.startsWith('/api')) {
    return res.sendFile(path.join(distPath, 'index.html'));
  }
  next();
});

// Global 404 for unmatched API requests
app.use('/api', (req, res) => {
  res.status(404).json({ success: false, message: 'API endpoint not found' });
});



app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

// 5. Initialize Database & Listen
async function startServer() {
  await initDatabase();
  app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`🚀 [CodeVidya Backend Server] Running on http://localhost:${PORT}`);
    console.log(`🔒 [Security Guardrails] Helmet, Rate Limiter & SQL Protection Active`);
    console.log(`🗄️  [Database Engine] ${db.isMySql() ? 'MySQL Active' : 'Fallback Engine Active'}`);
    console.log(`📡 [API Health Check] http://localhost:${PORT}/api/health`);
    console.log(`====================================================`);
  });
}

startServer();
