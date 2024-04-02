const mongoose = require('mongoose');
const counterModel = require('./counter.model');

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
