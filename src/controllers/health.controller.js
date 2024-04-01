const logger = require('../utils/logger');

const getAllHealth = (req, res) => {
  logger.info('GET health data');
  res.status(200).send({ status: 'Success', statusCode: res.statusCode, data: 'health datas' });
};

module.exports = { getAllHealth };
