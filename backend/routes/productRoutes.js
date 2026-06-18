const express = require('express');
const router = express.Router();
const {
  getProducts,
  createProduct,
  updateStock,
  deleteProduct
} = require('../controllers/productController');

router.get('/', getProducts);
router.post('/', createProduct);
router.patch('/:id', updateStock);
router.delete('/:id', deleteProduct);

module.exports = router;
