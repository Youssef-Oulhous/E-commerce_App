import React, { useState } from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  BarChart,
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import './Dashboard.css';

// Import dashboard pages
import OverviewPage from './pages/OverviewPage';
import ProductsPage from './pages/ProductsPage';
import OrdersPage from './pages/OrdersPage';
import CustomersPage from './pages/CustomersPage';
import AnalyticsPage from './pages/AnalyticsPage';
import AddProductPage from './pages/AddProductPage';
import { Button } from './UI/Button';

// Import services
import { fetchProducts, createProduct, updateProduct, deleteProduct } from './services/productService';
import { fetchOrders, updateOrderStatus, cancelOrder } from './services/dashboardService';
import { fetchUsers } from './services/userService';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleLogout = () => {
    // Clear auth tokens/user data
    localStorage.removeItem('token');
    
    // Redirect to login
    navigate('/login');
  };

  // Product handlers
  const handleAddProduct = () => {
    navigate('add-product');
  };

  const handleViewProduct = (productId: string) => {
    navigate(`products/${productId}`);
  };

  const handleEditProduct = (productId: string) => {
    navigate(`products/edit/${productId}`);
  };

  const handleDeleteProduct = async (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(productId);
        alert('Product deleted successfully');
        // Refresh products list
        window.location.reload();
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product');
      }
    }
  };

  // Order handlers
  const handleViewOrder = (orderId: string) => {
    navigate(`orders/${orderId}`);
  };

  const handleCancelOrder = async (orderId: string) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      try {
        await cancelOrder(orderId);
        alert('Order cancelled successfully');
        // Refresh orders list
        window.location.reload();
      } catch (error) {
        console.error('Error cancelling order:', error);
        alert('Failed to cancel order');
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          className="bg-white"
          onClick={toggleSidebar}
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Sidebar */}
      <div className={`fixed lg:static inset-y-0 left-0 z-30 transform bg-white w-64 p-6 shadow-xl transition-transform lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} duration-300 ease-in-out flex flex-col justify-between`}>
        {/* Close button on mobile */}
        <div className="lg:hidden flex justify-end">
          <Button size="sm" variant="ghost" onClick={closeSidebar}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Logo */}
        <div className="mb-8">
          <Link to="/dashboard" className="flex items-center gap-2 text-xl font-bold text-primary" onClick={closeSidebar}>
            <ShoppingBag />
            <span>E-Commerce Admin</span>
          </Link>
        </div>
        
        {/* Navigation links */}
        <div className="space-y-1 flex-grow">
          <Link to="/dashboard" className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors" onClick={closeSidebar}>
            <LayoutDashboard className="h-5 w-5" />
            Overview
          </Link>
          <Link to="products" className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors" onClick={closeSidebar}>
            <Package className="h-5 w-5" />
            Products
          </Link>
          <Link to="orders" className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors" onClick={closeSidebar}>
            <ShoppingBag className="h-5 w-5" />
            Orders
          </Link>
          <Link to="customers" className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors" onClick={closeSidebar}>
            <Users className="h-5 w-5" />
            Customers
          </Link>
          <Link to="analytics" className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors" onClick={closeSidebar}>
            <BarChart className="h-5 w-5" />
            Analytics
          </Link>
        </div>
        
        {/* Bottom buttons */}
        <div className="space-y-1">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors">
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {/* Inner content */}
          <Routes>
            <Route index element={<OverviewPage />} />
            <Route path="products" element={
              <ProductsPage 
                onAddProduct={handleAddProduct}
                onViewProduct={handleViewProduct}
                onEditProduct={handleEditProduct}
                onDeleteProduct={handleDeleteProduct}
              />
            } />
            <Route path="orders" element={
              <OrdersPage 
                onViewOrder={handleViewOrder}
                onCancelOrder={handleCancelOrder}
              />
            } />
            <Route path="customers" element={<CustomersPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="add-product" element={<AddProductPage />} />
          </Routes>
        </main>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-gray-900 bg-opacity-50 z-20"
          onClick={closeSidebar}
        ></div>
      )}
    </div>
  );
};

export default Dashboard; 