const { Router } = require('express');

const ProductRouter = Router();

ProductRouter.get('/', (req, res) => {
  res.status(200).send({ status: res.statusCode, data: [{ id: 1, name: 'Bakso', harga: 10000 }] });
});

module.exports = { ProductRouter };
