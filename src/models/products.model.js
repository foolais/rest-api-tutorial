const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
  product_id: {
    type: String,
    unique: true
  },
  nama: {
    type: String
  },
  harga: {
    type: Number
  },
  keterangan: {
    type: String,
    default: ''
  },
  status: {
    type: String
  },
  timestamps: {
    created_at: {
      type: Date,
      default: Date.now
    },
    updated_at: {
      type: Date,
      default: Date.now
    }
  }
});

const productsModel = mongoose.model('products', productsSchema);

module.exports = productsModel;
