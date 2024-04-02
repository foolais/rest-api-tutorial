const logger = require('../utils/logger');

const successResponse = (statusCode, data, message, loggerMessage, res) => {
  const response = {
    statusCode,
    message: `${message}`
  };

  if (data !== null) response.data = data;

  logger.info(`Success ${loggerMessage}`);
  res.status(statusCode).send(response);
};

const notFoundResponse = (statusCode, data, message, loggerMessage, res) => {
  const response = {
    statusCode,
    message: `${message}`
  };

  if (data !== null) response.data = data;

  logger.warn(`Failed ${statusCode} ${loggerMessage}`);
  res.status(statusCode).send(response);
};

const badRequestResponse = (statusCode, data, message, loggerMessage, res) => {
  const response = {
    statusCode,
    message: `${message}`
  };

  if (data !== null) response.data = data;

  logger.warn(`Failed ${statusCode} ${loggerMessage}`);
  res.status(statusCode).send(response);
};

const serverErrorResponse = (statusCode, data, message, loggerMessage, res) => {
  const response = {
    statusCode,
    message: `${message}`
  };

  if (data !== null) response.data = data;

  logger.error(`Failed ${statusCode} ${loggerMessage}`);
  res.status(statusCode).send(response);
};

module.exports = { successResponse, notFoundResponse, badRequestResponse, serverErrorResponse };
