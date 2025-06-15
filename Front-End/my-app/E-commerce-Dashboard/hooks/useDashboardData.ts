import { useState, useEffect } from 'react';
import { 
  fetchDashboardStats, 
  fetchTopSellingProducts, 
  fetchRecentOrders, 
  fetchRevenueByCategory 
} from '../services/dashboardService';

interface DashboardData {
  stats: {
    totalSales: number;
    totalOrders: number;
    cancelledOrders: number;
    pendingOrders: number;
    complitedOrder: number;
  } | null;
  topProducts: any[] | null;
  recentOrders: any[] | null;
  revenueByCategory: any[] | null;
  isLoading: boolean;
  error: string | null;
}

export const useDashboardData = (): DashboardData => {
  const [stats, setStats] = useState<any>(null);
  const [topProducts, setTopProducts] = useState<any[]>([]);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [revenueByCategory, setRevenueByCategory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Fetch all dashboard data in parallel
        const [statsData, topProductsData, recentOrdersData, revenueByCategoryData] = await Promise.all([
          fetchDashboardStats(),
          fetchTopSellingProducts(),
          fetchRecentOrders(5),
          fetchRevenueByCategory()
        ]);
        
        // Update state with fetched data
        setStats(statsData);
        setTopProducts(topProductsData);
        setRecentOrders(recentOrdersData);
        setRevenueByCategory(revenueByCategoryData);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    stats,
    topProducts,
    recentOrders,
    revenueByCategory,
    isLoading,
    error
  };
}; 