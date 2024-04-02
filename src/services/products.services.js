const productsModel = require('../models/products.model');

// get all product data
const getProductsFromDB = async () => {
  try {
    return await productsModel.find();
  } catch (error) {
    throw error;
  }
};

const getProductsById = async (id) => {
  try {
    return await productsModel.findOne({ product_id: id });
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

const updateProductById = async (id, payload) => {
  try {
    return await productsModel.findOneAndUpdate(
      {
        product_id: id
      },
      { $set: payload },
      { new: true }
    );
  } catch (error) {
    throw error;
  }
};

module.exports = { getProductsFromDB, getProductsById, addProductToDB, updateProductById };
