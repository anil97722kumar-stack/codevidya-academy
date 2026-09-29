import express from 'express';
import bcrypt from 'bcryptjs';
import { db } from '../config/db.js';
import { generateToken, verifyToken } from '../middleware/auth.js';
import { sensitiveLimiter } from '../middleware/security.js';

const router = express.Router();

// Helper to validate Gmail
const isValidGmail = (email) => {
  return typeof email === 'string' && /^[a-zA-Z0-9._%+-]+@gmail\.com$/i.test(email.trim());
};

// Helper to validate 10-digit phone
const isValidPhone = (phone) => {
  if (!phone) return false;
  const digits = String(phone).replace(/[\s\-()]/g, '');
  return /^[0-9]{10}$/.test(digits);
};

// Register new student (Strictly Gmail + Phone + Password)
router.post('/register', sensitiveLimiter, async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields (Full Name, Gmail Address, Phone Number, Password) are mandatory.' 
      });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = String(phone).replace(/[\s\-()]/g, '');

    if (!isValidGmail(cleanEmail)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid Gmail address. Please provide a valid @gmail.com address.' 
      });
    }

    if (!isValidPhone(cleanPhone)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid mobile number. Please enter a valid 10-digit Indian phone number (e.g., 9876543210).' 
      });
    }

    if (password.length < 6) {
      return res.status(400).json({ 
        success: false, 
        message: 'Password must be at least 6 characters long.' 
      });
    }

    // Check if email already exists
    const existingEmail = await db.findUserByEmail(cleanEmail);
    if (existingEmail) {
      return res.status(409).json({ 
        success: false, 
        message: 'An account with this Gmail address is already registered in MySQL.' 
      });
    }

    // Check if phone already exists
    const existingPhone = await db.findUserByPhone(cleanPhone);
    if (existingPhone) {
      return res.status(409).json({ 
        success: false, 
        message: 'An account with this phone number is already registered in MySQL.' 
      });
    }

    // Hash password with bcrypt
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const user = await db.createUser({ 
      name: name.trim(), 
      email: cleanEmail, 
      phone: cleanPhone, 
      password_hash 
    });
    const token = generateToken(user);

    return res.status(201).json({
      success: true,
      message: 'Student account registered successfully in MySQL!',
      user: { id: user.id, name: user.name, email: user.email, phone: user.phone, role: user.role },
      unlockedSheets: [],
      certificates: [],
      token
    });
  } catch (error) {
    console.error('Register error:', error);
    return res.status(500).json({ success: false, message: 'Database error during student registration.' });
  }
});

// Student Sign In (Requires Gmail address, Phone number, and Password)
router.post('/login', sensitiveLimiter, async (req, res) => {
  try {
    const { email, phone, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Gmail address and Password are required.' 
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    if (!isValidGmail(cleanEmail)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide a valid Gmail address (@gmail.com).' 
      });
    }

    const user = await db.findUserByEmail(cleanEmail);
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'No student found with this Gmail in MySQL. Please register first.' 
      });
    }

    // Verify phone number if provided
    if (phone) {
      const cleanPhone = String(phone).replace(/[\s\-()]/g, '');
      if (user.phone && user.phone !== cleanPhone) {
        return res.status(401).json({ 
          success: false, 
          message: 'Phone number does not match registered student profile in MySQL.' 
        });
      }
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ 
        success: false, 
        message: 'Incorrect password. Please verify your credentials.' 
      });
    }

    const token = generateToken(user);
    const unlockedSheets = await db.getUserUnlockedSheets(user.email);
    const certificates = await db.getUserCertificates(user.name);

    return res.json({
      success: true,
      message: 'Student authenticated successfully from MySQL!',
      user: { id: user.id, name: user.name, email: user.email, phone: user.phone, role: user.role },
      unlockedSheets,
      certificates,
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ success: false, message: 'Database error during student login.' });
  }
});

// Current student profile
router.get('/me', verifyToken, async (req, res) => {
  try {
    const user = await db.findUserByEmail(req.user.email);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Student not found in MySQL.' });
    }

    const unlockedSheets = await db.getUserUnlockedSheets(user.email);
    const certificates = await db.getUserCertificates(user.name);

    return res.json({
      success: true,
      user: { id: user.id, name: user.name, email: user.email, phone: user.phone, role: user.role },
      unlockedSheets,
      certificates
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error retrieving student profile.' });
  }
});

export default router;
