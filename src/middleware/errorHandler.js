const logger = require('../logger');

module.exports = function errorHandler(err, req, res, next) {
  logger.error({ err }, 'Unhandled error');
  if (res.headersSent) return next(err);
  res.status(500).json({ error: 'Internal Server Error' });
};