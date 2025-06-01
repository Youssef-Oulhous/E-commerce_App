const {Order} = require('../models/Orders');
const Product = require('../models/product');
const {getNextOrderNumber} = require('./getNextOrderNumber ')

const CreateOrder = async (req,res) =>{
    try{

      const { products } = req.body;
      const userId = req.user.id;


        if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: 'No products provided' });
    }

    let totalAmount = 0 ;

    for (const item of products){
      const product = await Product.findById(item.productId);
      if(!product) return res.status(404).json(`product not found : ${item.productId}`)

        totalAmount += product.price * item.quantity ; 
    }

    
      const orderNumber = await getNextOrderNumber(); 
    

      const order = await Order.create({
        user : userId,
        products,
        totalAmount,
        orderNumber
      })
        
        await order.save();

        res.status(201).json({message :'the Order Placed successfully', orderNumber})
    } catch(err){
        res.status(500).json({ error: 'Failed to create order', details: err.message })
    }
}



const getAllOrders = async(req,res)=>{
   try {
    const orders = await Order.find().populate('user').populate('products.productId');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};


const getDashboardStates = async(req,res)=>{
    try{

        const totalOrders = await Order.countDocuments();
        const complitedOrder = await Order.countDocuments({status:'completed'});
        const cancelledOrders = await Order.countDocuments({status:'cancelled'});
        const pendingOrders = await Order.countDocuments({status:'pending'})

         const totalSales = await Order.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } },
    ]);

    res.status(200).json({
        totalOrders,
        complitedOrder,
        cancelledOrders,
        pendingOrders,
        totalSales: totalSales[0]?.total || 0,
    });



    } catch(err){
            res.status(500).json({ error: 'Failed to get dashboard stats' });
    }
}

const TopSalesProducts = async (req,res) =>{
  try{

    

  } catch (err){

  }
}


const DeleteOrder = async(req,res)=>{
     try {
    const orders = await Order.find()
      .populate('user')
      .populate('products.productId');

    res.status(200).json(orders);
  } catch (err) {
    console.log(" Error in getAllOrders:", err);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
}

module.exports = {
    CreateOrder,
    getAllOrders,
    getDashboardStates,
    DeleteOrder
}
