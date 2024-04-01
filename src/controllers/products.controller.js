const logger = require('../utils/logger');
const { createProductsValidation } = require('../validations/products.validation');

// GET All Product
const getAllProducts = (req, res) => {
  logger.info('GET product data');
  res.status(200).send({
    status: res.statusCode,
    data: [{ id: 1, nama: 'Bakso', harga: 10000, keterangan: '', status: 'tersedia' }]
  });
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

module.exports = { getAllProducts, createProducts };
