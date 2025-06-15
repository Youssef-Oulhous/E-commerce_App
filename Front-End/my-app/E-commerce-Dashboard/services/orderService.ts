import axios from 'axios';


const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5500/api';

export const getDashboardStats = async () => {
  try {
    const response = await axios.get(`${API_URL}/orders/dashboard-stats`);
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    throw error;
  }
};

export const getTopSellingProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/orders/top-products`);
    return response.data;
  } catch (error) {
    console.error('Error fetching top selling products:', error);
    throw error;
  }
};

export const getRecentOrders = async () => {
  try {
    const response = await axios.get(`${API_URL}/orders`);
    return response.data;
  } catch (error) {
    console.error('Error fetching recent orders:', error);
    throw error;
  }
};

export const getRevenueByCategory = async () => {
  try {
    const response = await axios.get(`${API_URL}/orders/revenue-by-category`);
    return response.data;
  } catch (error) {
    console.error('Error fetching revenue by category:', error);
    throw error;
  }
}; 