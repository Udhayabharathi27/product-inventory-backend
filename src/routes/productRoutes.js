const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { validateProduct } = require('../middleware/validation');

// GET /api/products - Get all products (with optional search & category filter)
router.get('/', productController.getAllProducts);

// GET /api/products/:id - Get product by ID
router.get('/:id', productController.getProductById);

// POST /api/products - Create new product
router.post('/', validateProduct, productController.createProduct);

// PUT /api/products/:id - Update product
router.put('/:id', validateProduct, productController.updateProduct);

// DELETE /api/products/:id - Delete product
router.delete('/:id', productController.deleteProduct);

module.exports = router;