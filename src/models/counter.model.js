const mongoose = require('mongoose');

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

module.exports = counterModel;
