const express = require('express');
const router = express.Router();
const {
    AddProduct,
    getAllProducts,
    getProductByCategory,
    getProductByBrand,
    getProductById,
    getProductByRating,
    deleteProduct,
    getBySearch,
    getProductsByPrice
} = require('../controllers/userControllers');


router.post('/', AddProduct);

router.get('/',getAllProducts);
router.get('/search',getBySearch)
router.get('/category',getProductByCategory);
router.get('/brand',getProductByBrand);
router.get('/rating',getProductByRating);
router.get('/price',getProductsByPrice);



router.get('/:id',getProductById);
router.delete('/:id',deleteProduct);



module.exports = router;

