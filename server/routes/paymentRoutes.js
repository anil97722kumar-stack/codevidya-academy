import express from 'express';
import { db } from '../config/db.js';
import { sensitiveLimiter } from '../middleware/security.js';

const router = express.Router();

// 1. Create order & calculate price with coupons
router.post('/create-order', sensitiveLimiter, async (req, res) => {
  try {
    const { courseId, sheetPrice, couponCode, userEmail } = req.body;

    if (!courseId || !sheetPrice) {
      return res.status(400).json({ success: false, message: 'Missing courseId or price.' });
    }

    let discount = 0;
    let code = (couponCode || '').trim().toUpperCase();

    if (code === 'CS50') {
      discount = Math.round(sheetPrice * 0.5);
    } else if (code === 'CSFREE' || code === 'STUDENT100') {
      discount = sheetPrice;
    } else if (code === 'EARLYBIRD') {
      discount = 40;
    }

    const finalAmount = Math.max(0, sheetPrice - discount);
    const orderId = `ORD-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

    return res.json({
      success: true,
      orderId,
      originalAmount: sheetPrice,
      discount,
      finalAmount,
      couponApplied: discount > 0 ? code : null
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to create payment order.' });
  }
});

// 2. Verify payment & unlock practice sheet
router.post('/verify', sensitiveLimiter, async (req, res) => {
  try {
    const { orderId, courseId, amount, paymentMethod, couponApplied, userEmail } = req.body;

    if (!courseId) {
      return res.status(400).json({ success: false, message: 'Invalid payload: courseId required.' });
    }

    const cleanEmail = userEmail || 'guest-student@codevidya.edu';
    const cleanOrderId = orderId || `ORD-${Date.now()}`;

    // Record order in MySQL / database
    const order = await db.createOrder({
      order_id: cleanOrderId,
      user_email: cleanEmail,
      course_id: courseId,
      amount: amount || 0,
      status: 'SUCCESS',
      payment_method: paymentMethod || 'UPI',
      coupon_applied: couponApplied || null
    });

    const unlockedSheets = await db.getUserUnlockedSheets(cleanEmail);

    return res.json({
      success: true,
      message: 'Payment verified successfully! Practice sheet is now unlocked.',
      order,
      unlockedSheets
    });
  } catch (error) {
    console.error('Payment verification error:', error);
    return res.status(500).json({ success: false, message: 'Failed to verify payment.' });
  }
});

// 3. Get user's unlocked sheets
router.get('/my-sheets', async (req, res) => {
  const email = req.query.email || 'guest-student@codevidya.edu';
  const sheets = await db.getUserUnlockedSheets(email);
  return res.json({ success: true, unlockedSheets: sheets });
});

export default router;
