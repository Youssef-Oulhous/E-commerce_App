const Order = require("../models/Orders");
const Product = require("../models/product");
const getNextOrderNumber = require("./getNextOrderNumber ");

const CreateOrder = async (req, res) => {
  try {
    const { products } = req.body;
    const userId = req.user.id;

    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: "No products provided" });
    }

    let totalAmount = 0;

    for (const item of products) {
      const product = await Product.findById(item.productId);
      if (!product)
        return res.status(404).json(`product not found : ${item.productId}`);

      totalAmount += product.price * item.quantity;
    }

    for (const item of products) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res
          .status(404)
          .json({ message: `Product not found: ${item.productId}` });
      }

      if (product.stock < item.quantity) {
        return res
          .status(400)
          .json({ message: `Insufficient stock for ${product.name}` });
      }

      totalAmount += product.price * item.quantity;

      // Decrease the stock
      product.stock -= item.quantity;
      await product.save(); 
    }

    const orderNumber = await getNextOrderNumber();

    const order = await Order.create({
      user: userId,
      products,
      totalAmount,
      orderNumber,
    });

    await order.save();

    res
      .status(201)
      .json({ message: "the Order Placed successfully", orderNumber });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to create order", details: err.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user")
      .populate("products.productId");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

const getDashboardStates = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const complitedOrder = await Order.countDocuments({ status: "completed" });
    const cancelledOrders = await Order.countDocuments({ status: "cancelled" });
    const pendingOrders = await Order.countDocuments({ status: "pending" });

    const totalSales = await Order.aggregate([
      { $match: { status: "completed" } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);

    res.status(200).json({
      totalOrders,
      complitedOrder,
      cancelledOrders,
      pendingOrders,
      totalSales: totalSales[0]?.total || 0,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to get dashboard stats" });
  }
};

const TopSalesProducts = async (req, res) => {
  try {
  } catch (err) {}
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params; // Order ID from URL
    const { status } = req.body; // Correctly get status from body

    const validStatuses = ["pending", "completed", "cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      message: "Order status updated successfully",
      order: updatedOrder,
    });
  } catch (err) {
    res.status(500).json({
      error: "Failed to update order status",
      details: err.message,
    });
  }
};

const GetOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const findOrder = await Order.findById(id);
    if (!findOrder)
      return res.status(404).json({ message: "the Order not found " });

    res.status(200).json(findOrder);
  } catch (err) {
    res.status(500).json({
      error: "Failed to get order ",
      details: err.message,
    });
  }
};

const TopSalesProduct = async (req, res) => {
  try {
    const now = new Date();
    const lastWeek = new Date(now);
    lastWeek.setDate(now.getDate() - 7);

    const prevWeek = new Date(lastWeek);
    prevWeek.setDate(prevWeek.getDate() - 7);

    // Helper: Get sales for a time range
    const getSalesData = async (start, end) => {
      return await Order.aggregate([
        { $match: { createdAt: { $gte: start, $lt: end }, status: 'completed' } },
        { $unwind: "$products" },
        {
          $group: {
            _id: "$products.productId",
            totalSold: { $sum: "$products.quantity" }
          }
        }
      ]);
    };

    const currentSales = await getSalesData(lastWeek, now);
    const previousSales = await getSalesData(prevWeek, lastWeek);

    const salesMap = {};
    previousSales.forEach(p => {
      salesMap[p._id.toString()] = p.totalSold;
    });

    const topProducts = await Order.aggregate([
      { $match: { createdAt: { $gte: lastWeek }, status: 'completed' } },
      { $unwind: "$products" },
      {
        $lookup: {
          from: "products",
          localField: "products.productId",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      { $unwind: "$productDetails" },
      {
        $group: {
          _id: "$productDetails._id",
          name: { $first: "$productDetails.name" },
          price: { $first: "$productDetails.price" },
          category: { $first: "$productDetails.category" },
          image: { $first: "$productDetails.image" },
          totalSold: { $sum: "$products.quantity" },
          soldCount: { $sum: 1 },
          totalRevenue: {
            $sum: {
              $multiply: ["$products.quantity", "$productDetails.price"]
            }
          }
        }
      },
      { $sort: { totalSold: -1 } },
      { $limit: 5 }
    ]);

    // Add trend percentage
    const productsWithTrend = topProducts.map(product => {
      const prev = salesMap[product._id.toString()] || 0;
      const curr = product.totalSold;
      let trendPercentage = 0;

      if (prev === 0 && curr > 0) trendPercentage = 100;
      else if (prev > 0) trendPercentage = ((curr - prev) / prev) * 100;

      return {
        ...product,
        productId: product._id,
        trend: `${trendPercentage >= 0 ? '+' : ''}${trendPercentage.toFixed(2)}%`
      };
    });

    res.status(200).json(productsWithTrend);
  } catch (err) {
    res.status(500).json({
      error: "Failed to fetch top-selling products",
      details: err.message,
    });
  }
};


const revenueByCategory = async (req, res) => {
  try {
    const revenue = await Order.aggregate([
      { $match: { status: "completed" } }, // only completed orders
      { $unwind: "$products" },
      {
        $lookup: {
          from: "products",
          localField: "products.productId",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      { $unwind: "$productDetails" },
      {
        $group: {
          _id: "$productDetails.category",
          totalRevenue: {
            $sum: {
              $multiply: ["$products.quantity", "$productDetails.price"],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          totalRevenue: 1,
        },
      },
      { $sort: { totalRevenue: -1 } },
    ]);

    res.status(200).json(revenue);
  } catch (err) {
    res
      .status(500)
      .json({
        error: "Failed to calculate revenue by category",
        details: err.message,
      });
  }
};


const getRecentOrdersWithPagination = async (req, res) => {
  try {
    // Pagination inputs from query string, e.g. ?page=1
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    // Count total orders
    const totalOrders = await Order.countDocuments();

    // Get recent orders with sorting and pagination
    const orders = await Order.find()
      .sort({ createdAt: -1, _id: 1 }) // newest first
      .skip(skip)
      .limit(limit)
      .populate('user', 'name email')
      .populate('products.productId', 'name price image');

    // Calculate total pages
    const totalPages = Math.ceil(totalOrders / limit);

    res.status(200).json({
      currentPage: page,
      totalPages,
      totalOrders,
      orders,
    });
  } catch (err) {
    res.status(500).json({
      error: 'Failed to fetch recent orders',
      details: err.message,
    });
  }
};



const DeleteOrder = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user")
      .populate("products.productId");

    res.status(200).json(orders);
  } catch (err) {
    console.log(" Error in getAllOrders:", err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

module.exports = {
  CreateOrder,
  getAllOrders,
  getDashboardStates,
  DeleteOrder,
  updateOrderStatus,
  GetOrderById,
  TopSalesProduct,
  revenueByCategory,
  getRecentOrdersWithPagination
};
