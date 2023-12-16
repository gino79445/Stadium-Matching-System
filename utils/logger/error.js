const logger = require('./initLogger');

const logError = (err, req, res, next) => {
  let method = req.method;
  let url = req.url;
  let status = res.statusCode;

  logger.error({ message: `method=${method} url=${url} status=${status} error=${err.stack}`, labels: { 'origin': 'api' } });
  next();
};

module.exports = logError;