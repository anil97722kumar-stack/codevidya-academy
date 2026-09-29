import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

// 1. HTTP Security Headers
export const configureSecurityHeaders = () => {
  return helmet({
    contentSecurityPolicy: false, // Allows cross-origin video embeds (YouTube / course CDN)
    crossOriginEmbedderPolicy: false
  });
};

// 2. Global API Rate Limiter
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // Limit each IP to 200 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again after 15 minutes.'
  }
});

// 3. Sensitive Endpoint Rate Limiter (Auth & Payments)
export const sensitiveLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30, // 30 attempts per 15 minutes
  message: {
    success: false,
    message: 'Too many attempts on this sensitive endpoint. Rate limit triggered for security.'
  }
});

// 4. SQL Injection & XSS Input Sanitizer Middleware
export const sanitizeInput = (req, res, next) => {
  const dangerousPatterns = [
    /(\%27)|(\')|(\-\-)|(\%23)|(#)/i, // Basic SQL comment / quote injection
    /(<script[\s\S]*?>[\s\S]*?<\/script>)/gi, // Script tags
    /(javascript:)/gi,
    /(\b(UNION|SELECT|INSERT|DELETE|UPDATE|DROP|ALTER|CREATE)\b.*\b(FROM|INTO|TABLE|DATABASE)\b)/i // Obvious SQL payload injection
  ];

  const inspect = (obj) => {
    if (!obj || typeof obj !== 'object') return;
    for (const key of Object.keys(obj)) {
      const val = obj[key];
      if (typeof val === 'string') {
        for (const pattern of dangerousPatterns) {
          // Check for malicious SQL or XSS payload in input
          if (pattern.test(val) && !key.includes('code') && !key.includes('solution') && !key.includes('content')) {
            // Note: code fields are allowed to contain programming code
            return res.status(400).json({
              success: false,
              message: `Security Alert: Suspicious input pattern detected in field '${key}'.`
            });
          }
        }
      } else if (typeof val === 'object') {
        inspect(val);
      }
    }
  };

  if (req.body) {
    const errorResponse = inspect(req.body);
    if (errorResponse) return errorResponse;
  }

  next();
};
