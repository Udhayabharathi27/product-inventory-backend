const { pool } = require('../config/database');

const Product = {
  // Get all products
  async getAll() {
    try {
      const result = await pool.query('SELECT * FROM products ORDER BY created_at DESC');
      return result.rows;
    } catch (error) {
      throw error;
    }
  },

  // Get product by ID
  async getById(id) {
    try {
      const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  // Create new product
  async create(productData) {
    const { name, category, price, stock } = productData;
    try {
      const result = await pool.query(
        'INSERT INTO products (name, category, price, stock) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, category, parseFloat(price), parseInt(stock)]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  // Update product
  async update(id, productData) {
    const { name, category, price, stock } = productData;
    try {
      const result = await pool.query(
        'UPDATE products SET name = $1, category = $2, price = $3, stock = $4 WHERE id = $5 RETURNING *',
        [name, category, parseFloat(price), parseInt(stock), id]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  // Delete product
  async delete(id) {
    try {
      const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  // Search products by name or category
  async search(query) {
    try {
      const result = await pool.query(
        'SELECT * FROM products WHERE name ILIKE $1 OR category ILIKE $1 ORDER BY created_at DESC',
        [`%${query}%`]
      );
      return result.rows;
    } catch (error) {
      throw error;
    }
  },

  // Get products by category
  async getByCategory(category) {
    try {
      const result = await pool.query(
        'SELECT * FROM products WHERE category ILIKE $1 ORDER BY created_at DESC',
        [category]
      );
      return result.rows;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = Product;