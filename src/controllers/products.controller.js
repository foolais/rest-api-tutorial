const logger = require('../utils/logger');
const { createProductsValidation } = require('../validations/products.validation');
const { getProductsFromDB, addProductToDB, getProductsById } = require('../services/products.services');
const { v4: uuidv4 } = require('uuid');

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
        logger.info(`GET product by id ${id}`);
        return res.status(200).send({
          status: 'Success',
          statusCode: res.statusCode,
          data: product
        });
      } else {
        // jika tidak ada data yang ditemukan
        logger.error(`GET product by id ${id}`);
        return res.status(404).send({
          status: 'Data Not Found',
          statusCode: res.statusCode,
          message: 'Data tidak ditemukan',
          data: {}
        });
      }
    } else {
      // get all from query
      const products = await getProductsFromDB();
      logger.info('Success GET Products data');
      const responseData = {
        status: res.statusCode,
        data: products
      };
      return res.status(200).send(responseData);
    }
  } catch (error) {
    logger.error('Error GET product data', error);
    return res.status(500).send({
      status: 'Internal Server Error',
      statusCode: res.statusCode,
      message: 'Internal Server Error',
      data: {}
    });
  }
};

// POST new products
const createProducts = async (req, res) => {
  req.body.product_id = uuidv4();
  console.log('req', req.body);
  const { error, value } = createProductsValidation(req.body);

  // error handling post data
  if (error) {
    const errorMessage = error.details[0].message;
    logger.error(`Error POST product data : ${errorMessage}`);

    return res.status(400).send({ status: 'Bad Request', statusCode: res.statusCode, message: errorMessage, data: {} });
  }

  try {
    await addProductToDB(value);
    // Success post data
    logger.info('Success POST product data');
    return res
      .status(201)
      .send({ status: 'Success', statusCode: res.statusCode, message: 'Berhasil Menambahkan Data', data: req.body });
  } catch (error) {
    logger.error('Error POST product data', error);
    console.log(error);
    return res.status(500).send({
      status: 'Internal Server Error',
      statusCode: res.statusCode,
      message: 'Internal Server Error',
      data: {}
    });
  }
};

module.exports = { getProducts, createProducts };
