const { Router } = require('express');
const { getAllProducts, createProducts } = require('../controllers/products.controller');

const ProductsRouter = Router();

ProductsRouter.get('/', getAllProducts);
ProductsRouter.post('/', createProducts);

module.exports = { ProductsRouter };
