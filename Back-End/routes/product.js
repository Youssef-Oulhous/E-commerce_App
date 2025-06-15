const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductStats
} = require("../controllers/productController");
const authentication = require("../middleware/authentication");

// Protected routes
router.post("/", authentication, createProduct);
router.put("/:id", authentication, updateProduct);
router.delete("/:id", authentication, deleteProduct);

// Public routes
router.get("/", getAllProducts);
router.get("/stats", getProductStats);
router.get("/:id", getProductById);

module.exports = router; 