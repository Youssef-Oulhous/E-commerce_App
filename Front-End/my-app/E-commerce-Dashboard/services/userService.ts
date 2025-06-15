import axios from 'axios';

const API_URL = 'http://localhost:5500/api';

// API for fetching all users/customers
export const fetchUsers = async (page = 1, limit = 10, search = '') => {
  try {
    let url = `${API_URL}/user?page=${page}&limit=${limit}`;
    
    if (search) {
      url += `&search=${search}`;
    }
    
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// API for fetching user details
export const fetchUserById = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user #${userId}:`, error);
    throw error;
  }
};

// API for updating user details
export const updateUser = async (userId, userData) => {
  try {
    const response = await axios.put(`${API_URL}/user/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error(`Error updating user #${userId}:`, error);
    throw error;
  }
};

// API for deleting user
export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${API_URL}/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting user #${userId}:`, error);
    throw error;
  }
};

// API for fetching user orders
export const fetchUserOrders = async (userId, page = 1, limit = 10) => {
  try {
    const response = await axios.get(`${API_URL}/orders/user/${userId}?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching orders for user #${userId}:`, error);
    throw error;
  }
};

// API for customer statistics
export const fetchCustomerStats = async () => {
  try {
    const response = await axios.get(`${API_URL}/user/stats`);
    return response.data;
  } catch (error) {
    console.error('Error fetching customer statistics:', error);
    throw error;
  }
};

// API for top customers
export const fetchTopCustomers = async (limit = 5) => {
  try {
    const response = await axios.get(`${API_URL}/user/top?limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching top customers:', error);
    throw error;
  }
}; 