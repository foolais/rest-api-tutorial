const logger = require('../utils/logger');
const { createProductsValidation } = require('../validations/products.validation');

// GET All Product
const getProducts = (req, res) => {
  const products = [
    {
      id: 1,
      nama: 'Bakso',
      harga: 10000,
      keterangan: '',
      status: 'tersedia'
    },
    {
      id: 2,
      nama: 'Soto',
      harga: 8000,
      keterangan: '',
      status: 'tersedia'
    }
  ];

  // get from params
  const {
    params: { id }
  } = req;

  //get single product
  if (id) {
    logger.info(`GET product by id ${id}`);

    const product = products.filter((item) => item.id === +id);

    // jika tidak ada data yang ditemukan
    if (product.length === 0) {
      logger.error(`Product ${id} not found`);
      return res
        .status(404)
        .send({ status: 'Data Not Found', statusCode: res.statusCode, message: 'Product gagal ditemukan', data: {} });
    }
    // jika ada data yang ditemukan
    logger.info(`Product ${id} found`);
    return res.status(200).send({
      status: 'Success',
      statusCode: res.statusCode,
      message: 'Product berhasil ditemukan',
      data: product
    });
  }

  // get all from query
  logger.info('GET product data');
  res.status(200).send({
    status: res.statusCode,
    data: products
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

module.exports = { getProducts, createProducts };
