const { Router } = require('express');
const { getProducts, createProducts } = require('../controllers/products.controller');

const ProductsRouter = Router();

ProductsRouter.get('/', getProducts);
ProductsRouter.get('/:id', getProducts);
ProductsRouter.post('/', createProducts);

module.exports = { ProductsRouter };
