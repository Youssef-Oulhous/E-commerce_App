const {
      CreateOrder,
        getAllOrders,
        getDashboardStates,
        DeleteOrder,
} = require('../controllers/OrderController');
const authentication = require('../middleware/authentication');


const express = require('express');
const router = express.Router();


router.post('/',authentication,CreateOrder)
router.get('/',getAllOrders);
router.get('/Dashboard/stats',getDashboardStates);



router.delete('/:id',DeleteOrder)


module.exports = router ;