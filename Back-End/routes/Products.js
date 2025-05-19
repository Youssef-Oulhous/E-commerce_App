const express = require('express');
const router = express.Router();
const {
    AddProduct,
    getAllProducts,
    getProductByCategory,
    getProductByBrand,
    getProductById,
    getProductByRating,
    deleteProduct
} = require('../controllers/userControllers');


router.post('/', AddProduct);
router.get('/',getAllProducts);
router.get('/category',getProductByCategory);
router.get('/brand',getProductByBrand);
router.get('/:id',getProductById);
router.get('/rating',getProductByRating);
router.delete('/:id',deleteProduct);



module.exports = router;

