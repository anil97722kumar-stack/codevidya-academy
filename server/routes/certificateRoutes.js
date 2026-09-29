import express from 'express';
import crypto from 'crypto';
import { db } from '../config/db.js';

const router = express.Router();

// 1. Issue verified certificate upon passing exam (Score >= 70%)
router.post('/issue', async (req, res) => {
  try {
    const { studentName, courseId, courseTitle, scorePercentage } = req.body;

    if (!studentName || !courseId || scorePercentage === undefined) {
      return res.status(400).json({ success: false, message: 'Missing required exam fields.' });
    }

    if (scorePercentage < 70) {
      return res.status(400).json({
        success: false,
        message: 'Exam score does not meet the 70% passing threshold for certification.'
      });
    }

    // Generate unique Certificate ID
    const randomHex = Math.floor(1000 + Math.random() * 9000);
    const code = courseId.substring(0, 3).toUpperCase();
    const certId = `CV-2026-${code}-${randomHex}`;

    const issueDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Compute Cryptographic SHA-256 signature for tamper-proof verification
    const dataString = `${certId}|${studentName}|${courseId}|${scorePercentage}|${issueDate}`;
    const hashSignature = crypto.createHash('sha256').update(dataString).digest('hex');

    // Save to MySQL
    const certificate = await db.issueCertificate({
      cert_id: certId,
      student_name: studentName,
      course_id: courseId,
      course_title: courseTitle || courseId,
      score_percentage: scorePercentage,
      issue_date: issueDate,
      hash_signature: hashSignature
    });

    return res.status(201).json({
      success: true,
      message: 'Certificate issued and cryptographically recorded!',
      certificate
    });
  } catch (error) {
    console.error('Certificate issue error:', error);
    return res.status(500).json({ success: false, message: 'Failed to issue certificate.' });
  }
});

// 2. Public Recruiter Verification Endpoint
router.get('/verify/:certId', async (req, res) => {
  try {
    const { certId } = req.params;
    if (!certId) {
      return res.status(400).json({ success: false, message: 'Certificate ID is required.' });
    }

    const cert = await db.verifyCertificate(certId.trim());

    if (!cert) {
      return res.status(404).json({
        success: false,
        valid: false,
        message: `No authentic record found for Certificate ID: ${certId}`
      });
    }

    return res.json({
      success: true,
      valid: true,
      certificate: {
        id: cert.cert_id,
        studentName: cert.student_name,
        courseTitle: cert.course_title,
        courseId: cert.course_id,
        scorePercentage: cert.score_percentage,
        issueDate: cert.issue_date,
        status: cert.status,
        issuer: 'CodeVidya CS Academy',
        verificationHash: cert.hash_signature
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error during verification lookup.' });
  }
});

// 3. User's Certificates
router.get('/my-certificates', async (req, res) => {
  const studentName = req.query.name || '';
  const list = await db.getUserCertificates(studentName);
  return res.json({ success: true, certificates: list });
});

export default router;
