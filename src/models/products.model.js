const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema(
  {
    product_id: {
      type: Number,
      unique: true
    },
    nama: {
      type: String
    },
    harga: {
      type: Number
    },
    keterangan: {
      type: String
    },
    status: {
      type: String
    }
  },
  { timestamps: true }
);

const productsModel = mongoose.model('products', productsSchema);

module.exports = productsModel;
