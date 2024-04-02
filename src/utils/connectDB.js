const mongoose = require('mongoose');
const config = require('../config/environment');
const logger = require('../utils/logger');

mongoose
  .connect(`${config.db}`)
  .then(() => {
    logger.info('Connected to MongoDB');
  })
  .catch((error) => {
    logger.info('Failed to connect to MongoDB');
    logger.error(error);
    process.exit(1);
  });
