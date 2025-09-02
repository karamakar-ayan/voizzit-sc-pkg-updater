const express = require('express');
const pinoHttp = require('pino-http');
const cfg = require('./config');
const logger = require('./logger');
const security = require('./security');
const apiKeyAuth = require('./middleware/apiKeyAuth');
const rateLimiter = require('./middleware/rateLimit');
const errorHandler = require('./middleware/errorHandler');
const routes = require('./routes');

const app = express();

security(app);
app.use(express.json({ limit: '100kb' }));
app.use(pinoHttp({ logger }));

// Protected endpoints
app.use(apiKeyAuth, rateLimiter);
app.use(routes);

// Error handler
app.use(errorHandler);

const server = app.listen(cfg.port, cfg.host, () => {
  logger.info(`AptAPI listening on http://${cfg.host}:${cfg.port}`);
});

function shutdown(signal) {
  logger.warn({ signal }, 'Shutting down');
  server.close(() => {
    logger.info('HTTP server closed');
    process.exit(0);
  });
  setTimeout(() => process.exit(1), 10000).unref();
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));