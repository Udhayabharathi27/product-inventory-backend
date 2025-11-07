const Product = require('../models/productModel');

const productController = {
  // Get all products
  async getAllProducts(req, res) {
    try {
      const { search, category } = req.query;
      
      let products;
      if (search) {
        products = await Product.search(search);
      } else if (category) {
        products = await Product.getByCategory(category);
      } else {
        products = await Product.getAll();
      }
      
      res.json({
        success: true,
        data: products,
        count: products.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to fetch products',
        details: error.message
      });
    }
  },

  // Get product by ID
  async getProductById(req, res) {
    try {
      const product = await Product.getById(req.params.id);
      if (!product) {
        return res.status(404).json({
          success: false,
          error: 'Product not found'
        });
      }
      res.json({
        success: true,
        data: product
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to fetch product',
        details: error.message
      });
    }
  },

  // Create new product
  async createProduct(req, res) {
    try {
      const product = await Product.create(req.body);
      res.status(201).json({
        success: true,
        message: 'Product created successfully',
        data: product
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to create product',
        details: error.message
      });
    }
  },

  // Update product
  async updateProduct(req, res) {
    try {
      const product = await Product.update(req.params.id, req.body);
      if (!product) {
        return res.status(404).json({
          success: false,
          error: 'Product not found'
        });
      }
      res.json({
        success: true,
        message: 'Product updated successfully',
        data: product
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to update product',
        details: error.message
      });
    }
  },

  // Delete product
  async deleteProduct(req, res) {
    try {
      const product = await Product.delete(req.params.id);
      if (!product) {
        return res.status(404).json({
          success: false,
          error: 'Product not found'
        });
      }
      res.json({
        success: true,
        message: 'Product deleted successfully',
        data: product
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to delete product',
        details: error.message
      });
    }
  }
};

module.exports = productController;