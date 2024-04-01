const { Router } = require('express');
const logger = require('../utils/logger');

const HealthRouter = Router();

HealthRouter.get('/', (req, res) => {
  logger.info('GET health data');
  res.status(200).send({ status: 'Success', statusCode: res.statusCode, data: 'health datas' });
});

module.exports = { HealthRouter };
