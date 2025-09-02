const helmet = require('helmet');
const cors = require('cors');
const cfg = require('./config');

function security(app) {
  app.disable('x-powered-by');
  app.use(helmet({
    contentSecurityPolicy: false
  }));
  app.use(cors({ origin: cfg.corsOrigin }));
}

module.exports = security;