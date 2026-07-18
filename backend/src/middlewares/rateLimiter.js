import rateLimit from 'express-rate-limit';

/**
 * Rate limiter — restricts each IP to a set number of requests per window.
 * Adjust values via environment variables as needed.
 */
const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,                 // limit each IP to 100 requests per window
  standardHeaders: true,    // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false,     // Disable the `X-RateLimit-*` headers
  message: {
    success: false,
    error: 'Too many requests. Please try again later.',
  },
});

export default rateLimiter;
