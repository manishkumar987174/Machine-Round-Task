const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required']
  },
  price: {
    type: Number,
    required: [true, 'Product price is required']
  },
  stock: {
    type: Number,
    required: [true, 'Product stock is required'],
    default: 0
  },
  category: {
    type: String,
    required: [true, 'Product category is required']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
