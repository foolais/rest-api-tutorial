const { createProductsValidation, updateProductValidation } = require('../validations/products.validation');
const {
  getProductsFromDB,
  addProductToDB,
  getProductsById,
  updateProductById,
  deleteProductById
} = require('../services/products.services');
const { successResponse, notFoundResponse, serverErrorResponse, badRequestResponse } = require('../utils/response');

// GET All Product
const getProducts = async (req, res) => {
  try {
    // get from params
    const {
      params: { id }
    } = req;

    // get single product
    if (id) {
      const product = await getProductsById(id);

      if (product) {
        // jika ada data yang ditemukan
        successResponse(200, product, 'Berhasil Mengambil Data', 'GET product by id', res);
      } else {
        // jika tidak ada data yang ditemukan
        notFoundResponse(404, null, 'Data tidak ditemukan', 'GET product by id', res);
      }
    } else {
      // get all from query
      const products = await getProductsFromDB();
      if (products.length > 0) {
        successResponse(200, products, 'Berhasil Mengambil Data', 'GET All Products data', res);
      } else {
        notFoundResponse(404, null, 'Data tidak ditemukan', 'GET All Products data', res);
      }
    }
  } catch (error) {
    serverErrorResponse(500, null, 'Internal Server Error', 'GET Products data', res);
  }
};

// POST new products
const createProducts = async (req, res) => {
  console.log('req', req.body);
  const { error, value } = createProductsValidation(req.body);

  // error handling post data
  if (error) {
    const errorMessage = error.details[0].message;
    badRequestResponse(400, null, errorMessage, 'POST product data', res);
  }

  try {
    await addProductToDB(value);
    // Success post data
    successResponse(201, null, 'Berhasil Menambahkan Data', 'POST product data', res);
  } catch (error) {
    serverErrorResponse(500, null, 'Internal Server Error', 'POST product data', res);
  }
};

const updateProduct = async (req, res) => {
  const { error, value } = updateProductValidation(req.body);
  // error handling update data
  if (error) {
    const errorMessage = error.details[0].message;
    badRequestResponse(400, null, errorMessage, 'UPDATE product data', res);
  }

  try {
    const {
      params: { id }
    } = req;

    const result = await updateProductById(id, value);

    if (result) {
      successResponse(200, null, 'Berhasil Mengubah Data', 'UPDATE product data', res);
    } else {
      notFoundResponse(404, null, 'Data tidak ditemukan', 'UPDATE product data', res);
    }
  } catch (error) {
    serverErrorResponse(500, null, 'Internal Server Error', 'UPDATE product data', res);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const {
      params: { id }
    } = req;

    const result = await deleteProductById(id);
    if (result) {
      successResponse(200, null, 'Berhasil Menghapus Data', 'DELETE product data', res);
    } else {
      notFoundResponse(404, null, 'Data tidak ditemukan', 'DELETE product data', res);
    }
  } catch (error) {
    serverErrorResponse(500, null, 'Internal Server Error', 'DELETE product data', res);
  }
};

module.exports = { getProducts, createProducts, updateProduct, deleteProduct };
