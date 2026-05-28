const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  category: {
    type: String,
    required: true,
    enum: ['fruits', 'vegetables', 'dairy', 'bakery', 'beverages', 'snacks']
  },
  description: { type: String, default: '' },
  emoji: { type: String, default: '📦' },
  stock: { type: Number, default: 100, min: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);
