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
    const topProducts = await Order.aggregate([
      { $unwind: "$products" },

      // Join with the products collection using productId
      {
        $lookup: {
          from: "products", // <-- name of the actual MongoDB collection (not model)
          localField: "products.productId",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      { $unwind: "$productDetails" },

      // Group by product ID
      {
        $group: {
          _id: "$productDetails._id",
          name: { $first: "$productDetails.name" },
          price: { $first: "$productDetails.price" },
          category: { $first: "$productDetails.category" },
          image: { $first: "$productDetails.image" }, // optional
          totalSold: { $sum: "$products.quantity" },
          soldCount: { $sum: 1 },
          totalRevenue: {
            $sum: {
              $multiply: ["$products.quantity", "$productDetails.price"],
            },
          },
        },
      },

      // Sort and limit top 5
      { $sort: { totalSold: -1 } },
      { $limit: 5 },

      // Format output
      {
        $project: {
          _id: 0,
          productId: "$_id",
          name: 1,
          price: 1,
          category: 1,
          image: 1,
          totalSold: 1,
          soldCount: 1,
          totalRevenue: 1,
        },
      },
    ]);

    res.status(200).json(topProducts);
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
};
