const {
      CreateOrder,
        getAllOrders,
        getDashboardStates,
        DeleteOrder,
        updateOrderStatus,
        GetOrderById,
        TopSalesProduct,
        revenueByCategory
} = require('../controllers/OrderController');
const authentication =require('../middleware/authentication')


const express = require('express');
const router = express.Router();


router.post('/', authentication , CreateOrder )
router.get('/',getAllOrders);
router.get('/Dashboard/stats',getDashboardStates);
router.get('/Dashboard/stats/topProducts',TopSalesProduct);
router.get('/Dashboard/stats/CategotyRevenu',revenueByCategory);

router.get('/:id',GetOrderById);

router.put('/:id',updateOrderStatus);



router.delete('/:id',DeleteOrder)


module.exports = router ;