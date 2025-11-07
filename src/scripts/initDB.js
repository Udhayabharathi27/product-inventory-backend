const { Pool } = require('pg');
require('dotenv').config();

const initDB = async () => {
  const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'postgres' // Connect to default postgres database first
  });

  try {
    const client = await pool.connect();
    
    // Check if database exists, create if not
    const dbCheck = await client.query(
      "SELECT 1 FROM pg_database WHERE datname = $1", 
      [process.env.DB_NAME]
    );
    
    if (dbCheck.rows.length === 0) {
      console.log(`📁 Creating database: ${process.env.DB_NAME}`);
      await client.query(`CREATE DATABASE ${process.env.DB_NAME}`);
      console.log('✅ Database created successfully');
    } else {
      console.log(`✅ Database ${process.env.DB_NAME} already exists`);
    }
    
    client.release();
    await pool.end();
    
    console.log('🎉 Database setup completed!');
  } catch (error) {
    console.error('❌ Database setup failed:', error.message);
    process.exit(1);
  }
};

initDB();