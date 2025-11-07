const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { connectDB } = require('./config/database');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize database
connectDB();

// In src/app.js
app.use(cors({
  origin: ['http://localhost:5173', 'https://your-frontend-domain.vercel.app'],
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Product Inventory API is running!',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Product Inventory API: http://localhost:${PORT}/api/products`);
  console.log(`❤️ Health check: http://localhost:${PORT}/api/health`);
});