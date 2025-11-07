const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Initialize database schema
const initDatabase = async () => {
  try {
    const client = await pool.connect();
    
    // Create products table if it doesn't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        category VARCHAR(50),
        price DECIMAL(10, 2) NOT NULL,
        stock INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    console.log('✅ Database schema initialized successfully');
    client.release();
  } catch (error) {
    console.error('❌ Database initialization failed:', error.message);
    process.exit(1);
  }
};

// Test database connection and initialize
const connectDB = async () => {
  try {
    const client = await pool.connect();
    console.log('✅ Connected to PostgreSQL database');
    
    // Initialize schema
    await initDatabase();
    
    client.release();
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = { pool, connectDB };