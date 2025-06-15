# E-commerce Backend API

A robust and scalable backend API for the E-commerce Dashboard built with Node.js, Express, and MongoDB.

## Project Structure

```
Back-End/
├── src/
│   ├── config/             # Configuration files
│   │   ├── database.js     # Database configuration
│   │   └── env.js         # Environment variables
│   ├── controllers/        # Route controllers
│   │   ├── orderController.js
│   │   ├── productController.js
│   │   └── userController.js
│   ├── middleware/         # Custom middleware
│   │   ├── auth.js        # Authentication middleware
│   │   ├── error.js       # Error handling middleware
│   │   └── validation.js  # Request validation
│   ├── models/            # Database models
│   │   ├── Order.js
│   │   ├── Product.js
│   │   └── User.js
│   ├── routes/            # API routes
│   │   ├── orderRoutes.js
│   │   ├── productRoutes.js
│   │   └── userRoutes.js
│   ├── services/          # Business logic
│   │   ├── orderService.js
│   │   ├── productService.js
│   │   └── userService.js
│   ├── utils/             # Utility functions
│   │   ├── logger.js
│   │   └── helpers.js
│   └── app.js            # Express application setup
├── uploads/              # File uploads directory
├── tests/               # Test files
└── .env                # Environment variables
```

## Features

- 🔐 JWT Authentication
- 📦 Product Management
- 🛍️ Order Processing
- 👥 User Management
- 📊 Analytics and Reporting
- 📁 File Upload Support
- 🔄 Real-time Updates
- 📝 Input Validation
- 🛡️ Security Best Practices

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **ORM**: Mongoose
- **Authentication**: JWT
- **File Upload**: Multer
- **Validation**: Joi
- **Testing**: Jest

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create new product
- `GET /api/products/:id` - Get product by ID
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Orders
- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id` - Update order status
- `DELETE /api/orders/:id` - Cancel order

### Analytics
- `GET /api/analytics/dashboard` - Get dashboard stats
- `GET /api/analytics/revenue` - Get revenue data
- `GET /api/analytics/products` - Get product analytics

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Run tests:
   ```bash
   npm test
   ```

## Development Guidelines

### Code Style
- Follow ESLint configuration
- Use async/await for asynchronous operations
- Implement proper error handling
- Write meaningful comments

### Security
- Use environment variables for sensitive data
- Implement rate limiting
- Validate all input data
- Use proper authentication middleware
- Sanitize user input

### Performance
- Implement caching where appropriate
- Use proper database indexing
- Optimize database queries
- Implement pagination for large datasets

### Testing
- Write unit tests for services
- Write integration tests for API endpoints
- Maintain good test coverage
- Use proper test data

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License 