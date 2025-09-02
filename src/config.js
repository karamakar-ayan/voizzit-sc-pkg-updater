const path = require('path');
require('dotenv').config();

const cfg = {
  env: process.env.NODE_ENV || 'production',
  host: process.env.HOST || '0.0.0.0',
  port: parseInt(process.env.PORT || '4040', 10),
  apiKey: process.env.API_KEY,
  corsOrigin: process.env.CORS_ORIGIN || '*',
  logLevel: process.env.LOG_LEVEL || 'info'
};

module.exports = cfg;