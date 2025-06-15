const mongoose = require('mongoose');
const Order = require('./models/Orders');
const Product = require('./models/product');
const User = require('./models/User');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ecommerce';

async function seedData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Create a test user if it doesn't exist
    let user = await User.findOne({ email: 'test@example.com' });
    if (!user) {
      user = await User.create({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        role: 'user'
      });
    }

    // Create test products if they don't exist
    const products = await Product.find();
    if (products.length === 0) {
      const testProducts = await Product.create([
        {
          name: 'Test Product 1',
          description: 'Description for test product 1',
          price: 99.99,
          category: 'Electronics',
          stock: 100,
          brand: 'Test Brand',
          features: ['Feature 1', 'Feature 2'],
          image: '/uploads/products/default.jpg'
        },
        {
          name: 'Test Product 2',
          description: 'Description for test product 2',
          price: 149.99,
          category: 'Clothing',
          stock: 50,
          brand: 'Test Brand',
          features: ['Feature 1', 'Feature 2'],
          image: '/uploads/products/default.jpg'
        }
      ]);
      console.log('Created test products');
    }

    // Create test orders
    const orders = await Order.find();
    if (orders.length === 0) {
      const testOrders = await Order.create([
        {
          user: user._id,
          products: [
            { productId: products[0]._id, quantity: 2 },
            { productId: products[1]._id, quantity: 1 }
          ],
          totalAmount: 349.97,
          status: 'completed',
          orderNumber: 1001
        },
        {
          user: user._id,
          products: [
            { productId: products[0]._id, quantity: 1 }
          ],
          totalAmount: 99.99,
          status: 'pending',
          orderNumber: 1002
        },
        {
          user: user._id,
          products: [
            { productId: products[1]._id, quantity: 3 }
          ],
          totalAmount: 449.97,
          status: 'cancelled',
          orderNumber: 1003
        }
      ]);
      console.log('Created test orders');
    }

    console.log('Data seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
}

seedData(); 