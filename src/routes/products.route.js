const { Router } = require('express');
const { getProducts, createProducts, updateProduct, deleteProduct } = require('../controllers/products.controller');

const ProductsRouter = Router();

ProductsRouter.get('/', getProducts);
ProductsRouter.post('/', createProducts);
ProductsRouter.get('/:id', getProducts);
ProductsRouter.put('/:id', updateProduct);
ProductsRouter.delete('/:id', deleteProduct);

module.exports = { ProductsRouter };
