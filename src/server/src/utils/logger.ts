const logdna = require('@logdna/logger');

const options = {
  app: 'WhileTrue',
  level: 'info', // set a default for when level is not provided in function calls
};

const logger = logdna.createLogger(process.env.INGESTION_KEY || "none", options);

export default logger;
