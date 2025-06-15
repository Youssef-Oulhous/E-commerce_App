import axios from 'axios';

const API_URL = 'http://localhost:5500/api';

// API for fetching all products with pagination
export const fetchProducts = async (page = 1, limit = 10, search = '', category = '') => {
  try {
    let url = `${API_URL}/products?page=${page}&limit=${limit}`;
    
    if (search) {
      url += `&search=${search}`;
    }
    
    if (category) {
      url += `&category=${category}`;
    }
    
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// API for fetching product details
export const fetchProductById = async (productId) => {
  try {
    const response = await axios.get(`${API_URL}/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product #${productId}:`, error);
    throw error;
  }
};

// API for creating a new product
export const createProduct = async (productData, image = null) => {
  try {
    const formData = new FormData();
    
    // Add all product data to formData
    Object.keys(productData).forEach(key => {
      if (key === 'features' && Array.isArray(productData[key])) {
        formData.append(key, JSON.stringify(productData[key]));
      } else {
        formData.append(key, productData[key]);
      }
    });
    
    // Add image if exists
    if (image) {
      formData.append('image', image);
    }
    
    const response = await axios.post(`${API_URL}/products`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

// API for updating product
export const updateProduct = async (productId, productData, image = null) => {
  try {
    const formData = new FormData();
    
    // Add all product data to formData
    Object.keys(productData).forEach(key => {
      if (key === 'features' && Array.isArray(productData[key])) {
        formData.append(key, JSON.stringify(productData[key]));
      } else {
        formData.append(key, productData[key]);
      }
    });
    
    // Add image if exists
    if (image) {
      formData.append('image', image);
    }
    
    const response = await axios.put(`${API_URL}/products/${productId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  } catch (error) {
    console.error(`Error updating product #${productId}:`, error);
    throw error;
  }
};

// API for deleting product
export const deleteProduct = async (productId) => {
  try {
    const response = await axios.delete(`${API_URL}/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting product #${productId}:`, error);
    throw error;
  }
};

// API for fetching product statistics
export const fetchProductStats = async () => {
  try {
    const response = await axios.get(`${API_URL}/products/stats`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product statistics:', error);
    throw error;
  }
};

// API for fetching products by category
export const fetchProductsByCategory = async (category, limit = 10) => {
  try {
    const response = await axios.get(`${API_URL}/products/category/${category}?limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching products for category ${category}:`, error);
    throw error;
  }
};

// API for fetching products sorted by price
export const fetchProductsByPrice = async (order = 'desc', page = 1, limit = 10) => {
  try {
    const response = await axios.get(`${API_URL}/products/price?order=${order}&page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching products by price:`, error);
    throw error;
  }
}; 