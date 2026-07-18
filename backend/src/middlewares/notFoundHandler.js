import { HTTP_STATUS } from '../constants/index.js';

/**
 * Catch-all handler for undefined routes.
 */
const notFoundHandler = (req, res) => {
  res.status(HTTP_STATUS.NOT_FOUND).json({
    success: false,
    error: `Route ${req.method} ${req.originalUrl} not found.`,
  });
};

export default notFoundHandler;
