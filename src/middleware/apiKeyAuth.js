const cfg = require('../config');

module.exports = function apiKeyAuth(req, res, next) {
  const key = req.get('x-api-key') || req.get('authorization');
  if (!key || key.replace(/^Bearer\s+/i, '') !== cfg.apiKey) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  return next();
};