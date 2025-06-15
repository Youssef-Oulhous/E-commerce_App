import { useState, useEffect } from "react";
import { orderAPI } from "../lib/api";

interface OrderProduct {
  productId: {
    _id: string;
    name: string;
    price: number;
    image: string;
  };
  quantity: number;
}

interface Order {
  _id: string;
  user: {
    _id: string;
    username: string;
    email: string;
  };
  products: OrderProduct[];
  totalAmount: number;
  status: "pending" | "completed" | "cancelled";
  createdAt: string;
}

export default function OrderManagement() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Fetch orders
  useEffect(() => {
    setIsLoading(true);
    orderAPI.getOrders()
      .then((res) => {
        setOrders(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError("Failed to load orders");
        setIsLoading(false);
        console.error(err);
      });
  }, []);

  // Update order status
  const handleStatusChange = async (orderId: string, status: "pending" | "completed" | "cancelled") => {
    setIsLoading(true);
    setError(null);
    
    try {
      await orderAPI.updateOrderStatus(orderId, status);
      
      setOrders(orders.map(order => 
        order._id === orderId ? { ...order, status } : order
      ));
      
      setSuccess(`Order status updated to ${status}`);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError("Failed to update order status");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Order Management</h1>
      
      {/* Success/Error Messages */}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 mb-4 rounded">
          {success}
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-4 rounded">
          {error}
        </div>
      )}
      
      {/* Orders List */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b">Order ID</th>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Customer</th>
              <th className="py-2 px-4 border-b">Total</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={6} className="py-4 text-center">Loading orders...</td>
              </tr>
            )}
            
            {!isLoading && orders.length === 0 && (
              <tr>
                <td colSpan={6} className="py-4 text-center">No orders found</td>
              </tr>
            )}
            
            {!isLoading && orders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{order._id.substring(0, 8)}...</td>
                <td className="py-2 px-4 border-b">{formatDate(order.createdAt)}</td>
                <td className="py-2 px-4 border-b">
                  {order.user?.username || "Guest"}
                </td>
                <td className="py-2 px-4 border-b">${order.totalAmount.toFixed(2)}</td>
                <td className="py-2 px-4 border-b">
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                    order.status === "completed" ? "bg-green-100 text-green-800" :
                    order.status === "cancelled" ? "bg-red-100 text-red-800" :
                    "bg-yellow-100 text-yellow-800"
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-2 px-4 border-b">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                    >
                      View
                    </button>
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(
                        order._id, 
                        e.target.value as "pending" | "completed" | "cancelled"
                      )}
                      className="border rounded px-1 text-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Order Details</h2>
              <button 
                onClick={() => setSelectedOrder(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-500">Order ID: {selectedOrder._id}</p>
              <p className="text-sm text-gray-500">Date: {formatDate(selectedOrder.createdAt)}</p>
            </div>
            
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Customer</h3>
              <p>{selectedOrder.user?.username || "Guest"}</p>
              <p>{selectedOrder.user?.email || "No email provided"}</p>
            </div>
            
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Products</h3>
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-2 px-2 text-left">Product</th>
                    <th className="py-2 px-2 text-right">Price</th>
                    <th className="py-2 px-2 text-right">Qty</th>
                    <th className="py-2 px-2 text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.products.map((item) => (
                    <tr key={item.productId._id}>
                      <td className="py-2 px-2">
                        <div className="flex items-center">
                          <img 
                            src={item.productId.image ? `http://localhost:5500/uploads/${item.productId.image}` : "/placeholder.jpg"} 
                            alt={item.productId.name}
                            className="w-10 h-10 object-cover rounded mr-2"
                          />
                          <span>{item.productId.name}</span>
                        </div>
                      </td>
                      <td className="py-2 px-2 text-right">${item.productId.price.toFixed(2)}</td>
                      <td className="py-2 px-2 text-right">{item.quantity}</td>
                      <td className="py-2 px-2 text-right">${(item.quantity * item.productId.price).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t">
                    <td className="py-2 px-2 font-semibold" colSpan={3}>Total</td>
                    <td className="py-2 px-2 text-right font-semibold">${selectedOrder.totalAmount.toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Status</h3>
              <div className="flex items-center gap-4">
                <select
                  value={selectedOrder.status}
                  onChange={(e) => handleStatusChange(
                    selectedOrder._id, 
                    e.target.value as "pending" | "completed" | "cancelled"
                  )}
                  className="border rounded p-2"
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <span className={`inline-block px-2 py-1 rounded-full ${
                  selectedOrder.status === "completed" ? "bg-green-100 text-green-800" :
                  selectedOrder.status === "cancelled" ? "bg-red-100 text-red-800" :
                  "bg-yellow-100 text-yellow-800"
                }`}>
                  {selectedOrder.status}
                </span>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={() => setSelectedOrder(null)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 