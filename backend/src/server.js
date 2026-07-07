const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

// Security middleware
app.use(helmet());
app.use(morgan('dev'));

// Rate limiting
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 300, message: 'Too many requests' });
app.use('/api/', limiter);

// CORS
app.use(cors({
  origin: [process.env.FRONTEND_URL || 'http://localhost:3000', 'https://americandiamondacademy.com', 'https://www.americandiamondacademy.com'],
  credentials: true,
}));

// Body parser — webhook needs raw body
app.use('/api/payments/webhook', express.raw({ type: 'application/json' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/courses', require('./routes/courses'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/payments', require('./routes/payments'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/upload', require('./routes/upload'));
app.use('/api/leads', require('./routes/leads'));
app.use('/api/resources', require('./routes/resources'));
app.use('/api/blogs', require('./routes/blogs'));
app.use('/api/comingsoon', require('./routes/comingsoon'));
app.use('/api/diamonds', require('./routes/diamonds'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/stuller', require('./routes/stuller'));
app.use('/api/tool-skus', require('./routes/toolSkus'));

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'OK', timestamp: new Date() }));

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ success: false, message: err.message || 'Server Error' });
});

// 404
app.use((req, res) => res.status(404).json({ success: false, message: 'Route not found' }));

// Connect DB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => { console.error('❌ MongoDB Error:', err); process.exit(1); });

module.exports = app;