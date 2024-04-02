const productsModel = require('../models/products.model');
const logger = require('../utils/logger');

const getProductsFromDB = async () => {
  try {
    const data = await productsModel.find();
    logger.info('Success GET Products');
    return data;
  } catch (error) {
    logger.error('Error GET Products', error);
    throw error;
  }
};

module.exports = { getProductsFromDB };
