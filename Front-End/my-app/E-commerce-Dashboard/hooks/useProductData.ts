import { useState, useEffect } from 'react';
import { fetchProducts, fetchProductStats } from '../services/productService';

interface ProductData {
  products: any[];
  stats: {
    total: number;
    outOfStock: number;
    lowStock: number;
  } | null;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalProducts: number;
  };
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setPage: (page: number) => void;
  refreshData: () => Promise<void>;
}

export const useProductData = (initialPage = 1, initialLimit = 10): ProductData => {
  const [products, setProducts] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [page, setPage] = useState<number>(initialPage);
  const [limit] = useState<number>(initialLimit);
  const [pagination, setPagination] = useState({
    currentPage: initialPage,
    totalPages: 1,
    totalProducts: 0
  });

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Fetch products and stats in parallel
      const [productsData, statsData] = await Promise.all([
        fetchProducts(page, limit, searchQuery),
        fetchProductStats()
      ]);
      
      // Update state with fetched data
      setProducts(productsData.products || []);
      setStats(statsData);
      
      // Update pagination info
      setPagination({
        currentPage: productsData.currentpage || 1,
        totalPages: productsData.totalPages || 1,
        totalProducts: productsData.totalProducts || 0
      });
    } catch (err) {
      console.error('Error fetching product data:', err);
      setError('Failed to load product data');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch data when component mounts or when dependencies change
  useEffect(() => {
    fetchData();
  }, [page, limit, searchQuery]);

  // Function to manually refresh data
  const refreshData = async () => {
    await fetchData();
  };

  return {
    products,
    stats,
    pagination,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    setPage,
    refreshData
  };
}; 