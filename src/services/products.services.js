const productsModel = require('../models/products.model');
const logger = require('../utils/logger');

// get all product data
const getProductsFromDB = async () => {
  try {
    const data = await productsModel.find();
    return data;
  } catch (error) {
    throw error;
  }
};

const addProductToDB = async (payload) => {
  try {
    return await productsModel.create(payload);
  } catch (error) {
    throw error;
  }
};

module.exports = { getProductsFromDB, addProductToDB };
