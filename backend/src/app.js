import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import config from './config/index.js';
import chatRoutes from './routes/chatRoutes.js';
import notFoundHandler from './middlewares/notFoundHandler.js';
import errorHandler from './middlewares/errorHandler.js';
import rateLimiter from './middlewares/rateLimiter.js';

const app = express();

// ─── Security ──────────────────────────────────────────────────────
app.use(helmet());
app.use(cors({ origin: config.clientUrl, credentials: true }));

// ─── Rate limiting ─────────────────────────────────────────────────
app.use('/api/', rateLimiter);

// ─── Body parsing ──────────────────────────────────────────────────
app.use(express.json({ limit: '16kb' }));

// ─── Logging ───────────────────────────────────────────────────────
app.use(morgan('dev'));

// ─── Health check ──────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ success: true, status: 'healthy', timestamp: new Date().toISOString() });
});

// ─── Routes ────────────────────────────────────────────────────────
app.use('/api', chatRoutes);

// ─── Error handling ────────────────────────────────────────────────
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
