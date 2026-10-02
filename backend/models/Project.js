const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, default: 'Untitled Room' },
  imageUrl: String,
  walls: [{
    points: [{ x: Number, y: Number }],
    color: String
  }],
  beforeImage: String,
  afterImage: String
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
