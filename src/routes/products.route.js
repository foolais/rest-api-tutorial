const { Router } = require('express');
const logger = require('../utils/logger');

const ProductsRouter = Router();

ProductsRouter.get('/', (req, res) => {
  logger.info('GET product data');
  res.status(200).send({ status: res.statusCode, data: [{ id: 1, nama: 'Bakso', harga: 10000 }] });
});

ProductsRouter.post('/', (req, res) => {
  logger.info('Success POST product data');

  res.status(200).send({ status: res.statusCode, data: req.body });
});

module.exports = { ProductsRouter };
