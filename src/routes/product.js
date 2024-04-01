const { Router } = require('express');
const logger = require('../utils/logger');

const ProductRouter = Router();

ProductRouter.get('/', (req, res) => {
  logger.info('GET product data');
  res.status(200).send({ status: res.statusCode, data: [{ id: 1, name: 'Bakso', harga: 10000 }] });
});

module.exports = { ProductRouter };
