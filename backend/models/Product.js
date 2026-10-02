const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  shade: String,
  hex: String,
  finish: String,
  coverage: Number,
  price: { type: Number, required: true },
  rating: Number,
  category: String,
  image: String,
  description: String,
  stock: { type: Number, default: 100 }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
