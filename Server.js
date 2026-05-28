require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'FreshGrocery API is running',
    endpoints: {
      health: '/api/health',
      products: '/api/products',
      seedProducts: '/api/products/seed',
      orders: '/api/orders'
    }
  });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });
