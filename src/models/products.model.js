const mongoose = require('mongoose');

// Counter
const counterSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  sequence_value: {
    type: Number,
    default: 1
  }
});

const counterModel = mongoose.model('Counter', counterSchema);

// Product
const productsSchema = new mongoose.Schema({
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

productsSchema.pre('save', async function (next) {
  if (this.isNew) {
    try {
      const counter = await counterModel.findByIdAndUpdate(
        { _id: 'product_id' },
        { $inc: { sequence_value: 1 } },
        { new: true, upsert: true }
      );
      this.product_id = counter.sequence_value;
    } catch (error) {
      return next(error);
    }
  }

  next();
});

const productsModel = mongoose.model('products', productsSchema);

module.exports = productsModel;
