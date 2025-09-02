const pino = require('pino');
const cfg = require('./config');

const logger = pino({
  level: cfg.logLevel,
  redact: ['req.headers.authorization', 'req.headers["x-api-key"]'],
  base: undefined
});

module.exports = logger;