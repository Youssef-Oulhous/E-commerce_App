import { useState, useEffect } from 'react';
import { fetchOrders, updateOrderStatus, cancelOrder } from '../services/dashboardService';

interface OrderData {
  orders: any[];
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setPage: (page: number) => void;
  refreshData: () => Promise<void>;
  updateStatus: (orderId: string, status: string) => Promise<void>;
  cancelOrder: (orderId: string) => Promise<void>;
  page: number;
  limit: number;
}

export const useOrderData = (initialPage = 1, initialLimit = 10): OrderData => {
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [page, setPage] = useState<number>(initialPage);
  const [limit] = useState<number>(initialLimit);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Fetch orders with pagination and search
      const ordersData = await fetchOrders(page, limit, searchQuery);
      
      // Format orders data if needed
      const formattedOrders = Array.isArray(ordersData) ? ordersData.map((order: any) => ({
        id: order.orderNumber || order._id.substring(0, 6),
        customer: order.user?.name || "Guest",
        email: order.user?.email || "guest@example.com",
        amount: `$${order.totalAmount.toFixed(2)}`,
        status: order.status,
        date: new Date(order.createdAt).toISOString().split('T')[0],
        _id: order._id // Keep the original ID for API calls
      })) : [];
      
      // Update state with fetched data
      setOrders(formattedOrders);
    } catch (err) {
      console.error('Error fetching order data:', err);
      setError('Failed to load order data');
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

  // Function to update order status
  const handleUpdateStatus = async (orderId: string, status: string) => {
    try {
      await updateOrderStatus(orderId, status);
      
      // Update local state to reflect the change
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order._id === orderId ? { ...order, status } : order
        )
      );
    } catch (err) {
      console.error(`Error updating status for order ${orderId}:`, err);
      setError(`Failed to update order status`);
      throw err;
    }
  };

  // Function to cancel an order
  const handleCancelOrder = async (orderId: string) => {
    try {
      await cancelOrder(orderId);
      
      // Update local state to reflect the cancellation
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order._id === orderId ? { ...order, status: 'cancelled' } : order
        )
      );
    } catch (err) {
      console.error(`Error cancelling order ${orderId}:`, err);
      setError(`Failed to cancel order`);
      throw err;
    }
  };

  return {
    orders,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    setPage,
    refreshData,
    updateStatus: handleUpdateStatus,
    cancelOrder: handleCancelOrder,
    page,
    limit
  };
}; 