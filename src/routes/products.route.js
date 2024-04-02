const { Router } = require('express');
const { getProducts, createProducts, updateProduct } = require('../controllers/products.controller');

const ProductsRouter = Router();

ProductsRouter.get('/', getProducts);
ProductsRouter.post('/', createProducts);
ProductsRouter.get('/:id', getProducts);
ProductsRouter.put('/:id', updateProduct);

module.exports = { ProductsRouter };
