const { createLogger, transports, format, Logger } = require("winston");
const LokiTransport = require("winston-loki");

const options = {
  transports: [
    new LokiTransport({
      host: "http://localhost:9091",
      json: true,
      format: format.json(),
      onConnectionError: (error) => {
        console.log(error);
      }
    }),
    new transports.Console({
      format: format.combine(format.simple(), format.colorize())
    })
  ]
};

const logger = createLogger(options);

module.exports = logger;
