const mongoose = require('mongoose');

const colorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  shade: { type: String, required: true },
  hex: { type: String, required: true },
  category: { type: String, enum: ['Warm','Cool','Neutral','Earthy','Bold','Pastel','Luxury'], required: true },
  finish: { type: String, default: 'Matt' },
  coverage: { type: Number, default: 100 },
  price: { type: Number, default: 0 },
  rating: { type: Number, default: 4.5 },
  description: String,
  image: String
}, { timestamps: true });

module.exports = mongoose.model('Color', colorSchema);
