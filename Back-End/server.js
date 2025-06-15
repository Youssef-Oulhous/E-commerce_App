const express = require('express');
const app = express();
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const Port = process.env.PORT || 5500;

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.originalname)
  }
})
const upload = multer({storage})

// Import Routes
const ProductRouter = require('./routes/Products');
const ProductRouterNew = require('./routes/product');
const UserRoute = require('./routes/Users');
const Orders = require('./routes/Order');

// Middleware
app.use(cors());
app.use(express.json());
connectDB();

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/products', ProductRouter);
app.use('/api/product', ProductRouterNew); // New product route with stats endpoint
app.use('/api/user', UserRoute);
app.use('/api/orders', Orders);

// Upload endpoint
app.post('/api/uploads', upload.single('file'), (req, res) => {
    res.json(req.file)
})

// Root endpoint
app.get('/', (req, res) => {
    res.end('E-commerce App API')
});

// Start server
app.listen(Port, () => {
    console.log(`Server running on port ${Port}`);
})

