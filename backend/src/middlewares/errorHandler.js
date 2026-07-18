import { HTTP_STATUS } from '../constants/index.js';
import config from '../config/index.js';

/**
 * Custom application error with HTTP status code.
 */
export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Global error-handling middleware.
 * Must have 4 parameters so Express recognises it as an error handler.
 */
const errorHandler = (err, _req, res, _next) => {
  const statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  const isProduction = config.nodeEnv === 'production';

  console.error(`[ERROR] ${err.message}`, isProduction ? '' : err.stack);

  res.status(statusCode).json({
    success: false,
    error: err.isOperational ? err.message : 'An unexpected error occurred.',
    ...(isProduction ? {} : { stack: err.stack }),
  });
};

export default errorHandler;
