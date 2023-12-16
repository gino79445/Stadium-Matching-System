const logger = require('./initLogger');

const logResponseTime = (req, res, time) => {
  let method = req.method;
  let url = req.url;
  let status = res.statusCode;
 
  logger.info({ message: `method=${method} url=${url} status=${status} duration=${time}ms`, labels: { 'origin': 'api' } });
};

module.exports = logResponseTime;