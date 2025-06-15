import axios from 'axios';

const API_URL = 'http://localhost:5500/api';

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL
});

// Add authorization token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Product API calls
export const productAPI = {
  getAllProducts: (page = 1, limit = 6) => 
    api.get(`/products?page=${page}&limit=${limit}`),
  
  getProductById: (id) => 
    api.get(`/products/${id}`),
  
  searchProducts: (query) => 
    api.get(`/products/search?query=${encodeURIComponent(query)}`),
  
  getProductsByRating: (order = 'desc', page = 1, limit = 6) => 
    api.get(`/products/rating?order=${order}&page=${page}&limit=${limit}`),
  
  getProductsByPrice: (order = 'desc', page = 1, limit = 6) => 
    api.get(`/products/price?order=${order}&page=${page}&limit=${limit}`),
  
  getProductsByCategory: (category) => 
    api.get(`/products/category/${category}`),
  
  // Admin operations
  createProduct: (productData) => 
    api.post('/products', productData),
  
  updateProduct: (id, productData) => 
    api.put(`/products/${id}`, productData),
  
  deleteProduct: (id) => 
    api.delete(`/products/${id}`),
};

// User API calls
export const userAPI = {
  login: (credentials) => 
    api.post('/user/login', credentials),
  
  register: (userData) => 
    api.post('/user/register', userData),
  
  getUserProfile: () => 
    api.get('/user/profile'),
  
  updateUserProfile: (userData) => 
    api.put('/user/profile', userData),
};

// Order API calls
export const orderAPI = {
  createOrder: (orderData) => 
    api.post('/orders', orderData),
  
  getOrders: () => 
    api.get('/orders'),
  
  getOrderById: (id) => 
    api.get(`/orders/${id}`),
  
  updateOrderStatus: (id, status) => 
    api.put(`/orders/${id}/status`, { status }),
};

// Upload API call
export const uploadAPI = {
  uploadFile: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/uploads', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
};

export default {
  product: productAPI,
  user: userAPI,
  order: orderAPI,
  upload: uploadAPI
}; 