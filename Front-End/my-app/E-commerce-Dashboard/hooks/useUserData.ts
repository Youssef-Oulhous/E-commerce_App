import { useState, useEffect } from 'react';
import { fetchUsers, fetchUserById, fetchUserOrders } from '../services/userService';

interface UserData {
  users: any[];
  selectedUser: any | null;
  userOrders: any[];
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setPage: (page: number) => void;
  selectUser: (userId: string) => Promise<void>;
  refreshData: () => Promise<void>;
  page: number;
  limit: number;
}

export const useUserData = (initialPage = 1, initialLimit = 10): UserData => {
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [userOrders, setUserOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [page, setPage] = useState<number>(initialPage);
  const [limit] = useState<number>(initialLimit);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Fetch users with pagination and search
      const usersData = await fetchUsers(page, limit, searchQuery);
      
      // Format users data if needed
      const formattedUsers = Array.isArray(usersData) ? usersData.map((user: any) => ({
        id: user._id,
        name: user.name,
        email: user.email,
        joinDate: new Date(user.createdAt || Date.now()).toISOString().split('T')[0],
        orders: user.orderCount || 0,
        totalSpent: user.totalSpent ? `$${user.totalSpent.toFixed(2)}` : '$0.00'
      })) : [];
      
      // Update state with fetched data
      setUsers(formattedUsers);
    } catch (err) {
      console.error('Error fetching user data:', err);
      setError('Failed to load user data');
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

  // Function to select a user and fetch their details and orders
  const selectUser = async (userId: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Fetch user details and orders in parallel
      const [userData, userOrdersData] = await Promise.all([
        fetchUserById(userId),
        fetchUserOrders(userId)
      ]);
      
      // Update state with fetched data
      setSelectedUser(userData);
      
      // Format orders if needed
      const formattedOrders = Array.isArray(userOrdersData) ? userOrdersData.map((order: any) => ({
        id: order.orderNumber || order._id.substring(0, 6),
        amount: `$${order.totalAmount.toFixed(2)}`,
        status: order.status,
        date: new Date(order.createdAt).toISOString().split('T')[0],
        _id: order._id
      })) : [];
      
      setUserOrders(formattedOrders);
    } catch (err) {
      console.error(`Error fetching details for user ${userId}:`, err);
      setError('Failed to load user details');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    users,
    selectedUser,
    userOrders,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    setPage,
    selectUser,
    refreshData,
    page,
    limit
  };
}; 