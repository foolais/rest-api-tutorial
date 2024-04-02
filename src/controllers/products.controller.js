const logger = require('../utils/logger');
const { createProductsValidation } = require('../validations/products.validation');
const { getProductsFromDB } = require('../services/products.services');

// GET All Product
const getProducts = async (req, res) => {
  try {
    const products = await getProductsFromDB();

    // get from params
    const {
      params: { id }
    } = req;

    // get single product
    if (id) {
      logger.info(`GET product by id ${id}`);

      const product = products.filter((item) => item.product_id === +id);

      // jika tidak ada data yang ditemukan
      if (product.length === 0) {
        logger.error(`Product ${id} not found`);
        const errorResponse = {
          status: 'Data Not Found',
          statusCode: res.statusCode,
          message: 'Product tidak ditemukan',
          data: {}
        };
        return res.status(404).send(errorResponse);
      }
      // jika ada data yang ditemukan
      logger.info(`Product ${id} found`);
      const successResponse = {
        status: 'Success',
        statusCode: res.statusCode,
        message: 'Product ditemukan',
        data: product
      };
      return res.status(200).send(successResponse);
    }

    // get all from query
    logger.info('GET product data');
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
const createProducts = (req, res) => {
  const { error } = createProductsValidation(req.body);

  // error handling post data
  if (error) {
    const errorMessage = error.details[0].message;

    logger.error(`Error POST product data : ${errorMessage}`);
    return res.status(400).send({ status: 'Bad Request', statusCode: res.statusCode, message: errorMessage, data: {} });
  }

  // Success post data
  logger.info('Success POST product data');
  res
    .status(200)
    .send({ status: 'Success', statusCode: res.statusCode, message: 'Berhasil Menambahkan Data', data: req.body });
};

module.exports = { getProducts, createProducts };
