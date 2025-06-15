const Product = require("../models/product");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "../uploads/products");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|gif|webp/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("Only image files are allowed!"));
  },
}).single("image");

// Helper function to determine product status based on stock
const getStatusFromStock = (stock) => {
  if (stock === 0) {
    return "out_of_stock";
  } else if (stock < 20) {
    return "low_stock";
  } else {
    return "active";
  }
};

// Create a new product with image upload
const createProduct = async (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      console.error("Upload error:", err);
      return res.status(400).json({ message: err.message });
    }

    try {
      const { name, description, features, price, category, stock, brand } = req.body;
      
      // Log the received data for debugging
      console.log("Received product data:", {
        name,
        description,
        features,
        price,
        category,
        stock,
        brand,
        hasFile: !!req.file,
        hasImageUrl: !!req.body.imageUrl
      });
      
      // Validate required fields
      const missingFields = [];
      if (!name) missingFields.push("name");
      if (!description) missingFields.push("description");
      if (!price) missingFields.push("price");
      if (!category) missingFields.push("category");
      if (!stock) missingFields.push("stock");
      if (!brand) missingFields.push("brand");

      if (missingFields.length > 0) {
        return res.status(400).json({ 
          message: "Missing required fields", 
          fields: missingFields 
        });
      }

      // Get image path if file was uploaded
      let imagePath = null;
      if (req.file) {
        imagePath = `/uploads/products/${req.file.filename}`;
      } else if (req.body.imageUrl) {
        imagePath = req.body.imageUrl;
      }

      // Parse features if provided
      let parsedFeatures = [];
      if (features) {
        try {
          parsedFeatures = JSON.parse(features);
          if (!Array.isArray(parsedFeatures)) {
            return res.status(400).json({ message: "Features must be an array" });
          }
        } catch (e) {
          console.error("Error parsing features:", e);
          return res.status(400).json({ message: "Invalid features format" });
        }
      }

      // Parse numeric values
      const parsedPrice = parseFloat(price);
      const parsedStock = parseInt(stock);

      if (isNaN(parsedPrice) || parsedPrice < 0) {
        return res.status(400).json({ message: "Invalid price value" });
      }

      if (isNaN(parsedStock) || parsedStock < 0) {
        return res.status(400).json({ message: "Invalid stock value" });
      }

      // Determine product status based on stock level
      const status = getStatusFromStock(parsedStock);

      const product = new Product({
        name,
        description,
        features: parsedFeatures,
        price: parsedPrice,
        category,
        stock: parsedStock,
        brand,
        image: imagePath,
        status, // Set status based on stock
      });

      await product.save();
      console.log("Product created successfully:", {
        id: product._id,
        name: product.name,
        category: product.category,
        status: product.status
      });
      
      res.status(201).json({ 
        message: "Product created successfully", 
        product: {
          id: product._id,
          name: product.name,
          description: product.description,
          price: product.price,
          category: product.category,
          stock: product.stock,
          brand: product.brand,
          image: product.image,
          status: product.status
        }
      });
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ 
        message: "Error creating product", 
        error: error.message
      });
    }
  });
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
};

// Get a single product
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Error fetching product", error: error.message });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  try {
    upload(req, res, async function (err) {
      if (err) {
        console.error("Upload error:", err);
        return res.status(400).json({ message: err.message });
      }

      try {
        const { name, description, features, price, category, stock, brand } = req.body;
        
        // Get image path if file was uploaded
        let imagePath = null;
        if (req.file) {
          imagePath = `/uploads/products/${req.file.filename}`;
        } else if (req.body.imageUrl) {
          imagePath = req.body.imageUrl;
        }

        const updateData = {
          name,
          description,
          features: features ? JSON.parse(features) : undefined,
          price: price ? parseFloat(price) : undefined,
          category,
          brand,
        };

        // Only update stock and status if stock is provided
        if (stock !== undefined) {
          const parsedStock = parseInt(stock);
          updateData.stock = parsedStock;
          
          // Automatically update status based on new stock level
          updateData.status = getStatusFromStock(parsedStock);
        }

        if (imagePath) {
          updateData.image = imagePath;
        }

        const product = await Product.findByIdAndUpdate(
          req.params.id,
          updateData,
          { new: true }
        );

        if (!product) {
          return res.status(404).json({ message: "Product not found" });
        }

        res.json({ message: "Product updated successfully", product });
      } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ 
          message: "Error updating product", 
          error: error.message,
          stack: process.env.NODE_ENV === "development" ? error.stack : undefined
        });
      }
    });
  } catch (error) {
    console.error("Outer error in updateProduct:", error);
    res.status(500).json({ 
      message: "Error in product update", 
      error: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined
    });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Delete the image file if it exists and is a local file
    if (product.image && product.image.startsWith("/uploads/products/")) {
      const imagePath = path.join(__dirname, "..", product.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Error deleting product", error: error.message });
  }
};

// Get product statistics for dashboard
const getProductStats = async (req, res) => {
  try {
    // Count total products
    const total = await Product.countDocuments();
    
    // Count products with zero stock (out of stock)
    const outOfStock = await Product.countDocuments({ stock: 0 });
    
    // Count products with low stock (1-10 items)
    const lowStock = await Product.countDocuments({ 
      stock: { $gt: 0, $lte: 10 } 
    });

    res.status(200).json({
      total,
      outOfStock,
      lowStock
    });
  } catch (error) {
    console.error("Error fetching product statistics:", error);
    res.status(500).json({ 
      message: "Error fetching product statistics", 
      error: error.message 
    });
  }
};

// Update product statuses based on stock levels
const updateProductStatuses = async (req, res) => {
  try {
    // Find all products
    const products = await Product.find();
    
    let updated = 0;
    let unchanged = 0;
    
    // Process each product
    for (const product of products) {
      let newStatus;
      
      // Determine status based on stock level
      if (product.stock === 0) {
        newStatus = "out_of_stock";
      } else if (product.stock < 20) {
        newStatus = "low_stock";
      } else {
        newStatus = "active";
      }
      
      // Update product if status changed
      if (product.status !== newStatus) {
        product.status = newStatus;
        await product.save();
        updated++;
      } else {
        unchanged++;
      }
    }
    
    res.status(200).json({
      message: "Product statuses updated successfully",
      summary: {
        total: products.length,
        updated,
        unchanged
      }
    });
  } catch (error) {
    console.error("Error updating product statuses:", error);
    res.status(500).json({ 
      message: "Error updating product statuses", 
      error: error.message 
    });
  }
};

// Manual update for a single product's status
const updateProductStatus = async (req, res) => {
  try {
    const { id } = req.params;
    
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    
    // Determine status based on stock level
    let newStatus;
    if (product.stock === 0) {
      newStatus = "out_of_stock";
    } else if (product.stock < 20) {
      newStatus = "low_stock";
    } else {
      newStatus = "active";
    }
    
    // Update product status
    product.status = newStatus;
    await product.save();
    
    res.status(200).json({
      message: "Product status updated successfully",
      product: {
        id: product._id,
        name: product.name,
        stock: product.stock,
        status: product.status
      }
    });
  } catch (error) {
    console.error("Error updating product status:", error);
    res.status(500).json({ 
      message: "Error updating product status", 
      error: error.message 
    });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductStats,
  updateProductStatuses,
  updateProductStatus
}; 