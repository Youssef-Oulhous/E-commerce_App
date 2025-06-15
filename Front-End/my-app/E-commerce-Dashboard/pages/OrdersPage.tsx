import axios from "axios";

import { useState, useEffect } from "react";

import type React from "react";

import {
  Filter,
  Download,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../UI/Cart";

import { Button } from "../UI/Button";

import { Input } from "../UI/Input";

import { Badge } from "../UI/Badge";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../UI/Table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../UI/DropDown";

import { Eye } from "lucide-react";

interface Order {
  id: string;

  customer: string;

  email: string;

  amount: string;

  status: string;

  date: string;
}

interface OrdersPageProps {
  orders?: Order[];

  onViewOrder?: (orderId: string) => void;

  onDownloadInvoice?: (orderId: string) => void;

  onCancelOrder?: (orderId: string) => void;

  onSearch?: (query: string) => void;

  onFilter?: () => void;

  onExport?: () => void;
}

type RecentOrder = {
  id: string; // Assuming `orderNumber` is a number

  customer: string;

  email: string;

  amount: string; // formatted like "$120.00"

  status: string;

  date: string; // e.g. "6/13/2025"
};

type RecentOrdersResponse = {
  orders: any[];

  currentPage: number;

  totalPages: number;

  totalOrders: number;
};

// Add API URL constant
const API_URL = "http://localhost:5500/api";

export default function OrdersPage({
  orders,

  onViewOrder,

  onDownloadInvoice,

  onCancelOrder,

  onSearch,

  onFilter,

  onExport,
}: OrdersPageProps) {
  const [ordersData, setOrdersData] = useState<Order[]>([]);

  const [currentPage, setCurrentPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const fetchRecentOrders = async (page: number = 1): Promise<void> => {
    try {
      setIsLoading(true);

      setError(null);

      const response = await axios.get<RecentOrdersResponse>(
        `${API_URL}/orders/recent?page=${page}`
      );

      // Log the response for debugging
      console.log("API response:", response.data);

      // Update state with pagination data
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);

      // Ensure we're accessing orders correctly
      const ordersData = response.data.orders || [];

      // Map order data
      const formattedOrders = ordersData.map((order) => ({
        id: order.orderNumber?.toString() || order._id?.toString() || "N/A",

        customer: order.user?.name || "Unknown",

        email: order.user?.email || "No email",

        amount: `$${order.totalAmount?.toFixed(2) || "0.00"}`,

        status: order.status || "unknown",

        date: order.createdAt
          ? new Date(order.createdAt).toLocaleDateString()
          : "Unknown date",
      }));

      setOrdersData(formattedOrders);
    } catch (error: any) {
      console.error("Error fetching recent orders:", error);
      setError(
        error.response?.data?.error ||
          "Failed to load orders. Please try again."
      );
      setOrdersData([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentOrders(currentPage);
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold">Orders</h2>

          <p className="text-gray-500">Manage and track all customer orders</p>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={onFilter}>
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>

          <Button variant="outline" size="sm" onClick={onExport}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-lg md:text-xl">All Orders</CardTitle>

              <CardDescription>
                Complete list of customer orders
              </CardDescription>
            </div>

            <div className="flex items-center space-x-2">
              <Input
                placeholder="Search orders..."
                className="w-full sm:w-64"
                onChange={handleSearch}
              />

              <Button size="sm">Search</Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            {error && (
              <div className="text-red-500 text-center p-4 mb-4">{error}</div>
            )}

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[100px]">Order ID</TableHead>

                  <TableHead className="min-w-[150px]">Customer</TableHead>

                  <TableHead className="min-w-[100px]">Amount</TableHead>

                  <TableHead className="min-w-[100px]">Status</TableHead>

                  <TableHead className="min-w-[100px]">Date</TableHead>

                  <TableHead className="text-right min-w-[80px]">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                      Loading orders...
                    </TableCell>
                  </TableRow>
                ) : ordersData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                      No orders found
                    </TableCell>
                  </TableRow>
                ) : (
                  ordersData.map((order, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{order.id}</TableCell>

                      <TableCell>
                        <div>
                          <p className="font-medium">{order.customer}</p>

                          <p className="text-sm text-gray-500 hidden sm:block">
                            {order.email}
                          </p>
                        </div>
                      </TableCell>

                      <TableCell>{order.amount}</TableCell>

                      <TableCell>
                        <Badge
                          variant={
                            order.status === "completed"
                              ? "default"
                              : order.status === "processing"
                              ? "secondary"
                              : order.status === "shipped"
                              ? "outline"
                              : "destructive"
                          }
                        >
                          {order.status}
                        </Badge>
                      </TableCell>

                      <TableCell>{order.date}</TableCell>

                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>

                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => onViewOrder?.(order.id)}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              onClick={() => onDownloadInvoice?.(order.id)}
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Download Invoice
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => onCancelOrder?.(order.id)}
                            >
                              Cancel Order
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Showing page {currentPage} of {totalPages}
          </div>

          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevPage}
              disabled={currentPage <= 1}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleFirstPage}
              disabled={currentPage <= 1}
            >
              First Page
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleNextPage}
              disabled={currentPage >= totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
