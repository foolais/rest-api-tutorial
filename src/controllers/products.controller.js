const logger = require('../utils/logger');
const { createProductsValidation } = require('../validations/products.validation');
const { getProductsFromDB, addProductToDB } = require('../services/products.services');
const { v4: uuidv4 } = require('uuid');

// GET All Product
const getProducts = async (req, res) => {
  try {
    const products = await getProductsFromDB();

    // get from params
    const {
      params: { nama }
    } = req;

    // get single product
    if (nama) {
      logger.info(`GET product by nama ${nama}`);

      const product = products.filter((item) => item.nama.includes(nama));

      // jika tidak ada data yang ditemukan
      if (product.length === 0) {
        logger.error(`Product ${nama} not found`);
        const errorResponse = {
          status: 'Data Not Found',
          statusCode: res.statusCode,
          message: 'Product tidak ditemukan',
          data: {}
        };
        return res.status(404).send(errorResponse);
      }
      // jika ada data yang ditemukan
      logger.info(`Product ${nama} found`);
      const successResponse = {
        status: 'Success',
        statusCode: res.statusCode,
        message: 'Product ditemukan',
        data: product
      };
      return res.status(200).send(successResponse);
    }

    // get all from query
    logger.info('Success GET Products data');
    const responseData = {
      status: res.statusCode,
      data: products
    };
    return res.status(200).send(responseData);
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
