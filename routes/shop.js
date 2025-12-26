const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shopController');

// Product routes
router.get('/products', shopController.getAllProducts);
router.get('/products/:id', shopController.getProductById);
router.post('/products', shopController.createProduct);
router.put('/products/:id', shopController.updateProduct);
router.delete('/products/:id', shopController.deleteProduct);
router.get('/products/category/:category', shopController.getProductsByCategory);

module.exports = router;
