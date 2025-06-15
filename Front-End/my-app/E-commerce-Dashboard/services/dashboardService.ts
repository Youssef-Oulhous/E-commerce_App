import axios from 'axios';

const API_URL = 'http://localhost:5500/api';

// API for Dashboard Overview Data
export const fetchDashboardStats = async () => {
  try {
    const response = await axios.get(`${API_URL}/orders/dashboard-stats`);
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    throw error;
  }
};

// API for Top Selling Products
export const fetchTopSellingProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/orders/top-products`);
    return response.data;
  } catch (error) {
    console.error('Error fetching top selling products:', error);
    throw error;
  }
};

// API for Recent Orders
export const fetchRecentOrders = async (limit = 5) => {
  try {
    const response = await axios.get(`${API_URL}/orders?limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching recent orders:', error);
    throw error;
  }
};

// API for Revenue by Category
export const fetchRevenueByCategory = async () => {
  try {
    const response = await axios.get(`${API_URL}/orders/revenue-by-category`);
    return response.data;
  } catch (error) {
    console.error('Error fetching revenue by category:', error);
    throw error;
  }
};

// API for Order Data with Pagination
export const fetchOrders = async (page = 1, limit = 10, search = '', status = '') => {
  try {
    let url = `${API_URL}/orders?page=${page}&limit=${limit}`;
    
    if (search) {
      url += `&search=${search}`;
    }
    
    if (status) {
      url += `&status=${status}`;
    }
    
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

// API for Order Details
export const fetchOrderDetails = async (orderId) => {
  try {
    const response = await axios.get(`${API_URL}/orders/${orderId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching order details for #${orderId}:`, error);
    throw error;
  }
};

// API for Updating Order Status
export const updateOrderStatus = async (orderId, status) => {
  try {
    const response = await axios.put(`${API_URL}/orders/${orderId}/status`, { status });
    return response.data;
  } catch (error) {
    console.error(`Error updating status for order #${orderId}:`, error);
    throw error;
  }
};

// API to Cancel Order
export const cancelOrder = async (orderId) => {
  try {
    const response = await axios.put(`${API_URL}/orders/${orderId}/status`, { status: 'cancelled' });
    return response.data;
  } catch (error) {
    console.error(`Error cancelling order #${orderId}:`, error);
    throw error;
  }
}; 