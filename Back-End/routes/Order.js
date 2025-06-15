const {
      CreateOrder,
        getAllOrders,
        getDashboardStates,
        DeleteOrder,
        updateOrderStatus,
        GetOrderById,
        TopSalesProduct,
        revenueByCategory,
        getRecentOrdersWithPagination
} = require('../controllers/OrderController');
const authentication =require('../middleware/authentication')


const express = require('express');
const router = express.Router();


router.post('/', authentication , CreateOrder )
router.get('/',getAllOrders);
router.get('/dashboard-stats',getDashboardStates);
router.get('/top-products',TopSalesProduct);
router.get('/revenue-by-category',revenueByCategory);
router.get('/recent', getRecentOrdersWithPagination);

router.get('/:id',GetOrderById);

router.put('/:id/status',updateOrderStatus);



router.delete('/:id',DeleteOrder)


module.exports = router ;