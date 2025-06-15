import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5500/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Add request interceptor to include auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ERR_NETWORK") {
      console.error("Network Error: Unable to connect to the server");
      throw new Error("Unable to connect to the server. Please check if the server is running.");
    }
    throw error;
  }
);

// Orders API
export const orderService = {
  getDashboardStats: async () => {
    try {
      const response = await api.get('/orders/dashboard-stats');
      return response.data;
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      throw error;
    }
  },

  getTopSellingProducts: async () => {
    try {
      const response = await api.get('/orders/top-products');
      return response.data;
    } catch (error) {
      console.error('Error fetching top products:', error);
      throw error;
    }
  },

  getAllOrders: async () => {
    try {
      const response = await api.get('/orders');
      return response.data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  },

  getOrderById: async (orderId: string) => {
    try {
      const response = await api.get(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error;
    }
  },

  updateOrderStatus: async (orderId: string, status: string) => {
    try {
      const response = await api.put(`/orders/${orderId}`, { status });
      return response.data;
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  },

  deleteOrder: async (orderId: string) => {
    try {
      const response = await api.delete(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting order:', error);
      throw error;
    }
  }
};

// Products API
export const productService = {
  getAllProducts: async () => {
    try {
      const response = await api.get('/products');
      // Ensure we always return an array of products
      return Array.isArray(response.data) ? response.data : response.data.products || [];
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  getProductById: async (productId: string) => {
    try {
      const response = await api.get(`/products/${productId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },

  createProduct: async (formData: FormData) => {
    try {
      const response = await api.post('/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  updateProduct: async (productId: string, formData: FormData) => {
    try {
      const response = await api.put(`/products/${productId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  deleteProduct: async (productId: string) => {
    try {
      const response = await api.delete(`/products/${productId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }
};

// Customers API
export const customerService = {
  getAllCustomers: async () => {
    try {
      const response = await api.get('/users');
      return response.data;
    } catch (error) {
      console.error('Error fetching customers:', error);
      throw error;
    }
  },

  getCustomerById: async (customerId: string) => {
    try {
      const response = await api.get(`/users/${customerId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching customer:', error);
      throw error;
    }
  },

  getCustomerOrders: async (customerId: string) => {
    try {
      const response = await api.get(`/users/${customerId}/orders`);
      return response.data;
    } catch (error) {
      console.error('Error fetching customer orders:', error);
      throw error;
    }
  }
};

// Analytics API
export const analyticsService = {
  getRevenueByCategory: async () => {
    try {
      const response = await api.get('/orders/revenue-by-category');
      return response.data;
    } catch (error) {
      console.error('Error fetching revenue by category:', error);
      throw error;
    }
  },

  getSalesOverTime: async (timeframe: string) => {
    try {
      const response = await api.get(`/orders/sales-over-time?timeframe=${timeframe}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching sales over time:', error);
      throw error;
    }
  },

  getCustomerMetrics: async () => {
    try {
      const response = await api.get('/users/metrics');
      return response.data;
    } catch (error) {
      console.error('Error fetching customer metrics:', error);
      throw error;
    }
  }
};

export const authService = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  register: async (userData: any) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
  },
}; 