
import type React from "react"
import { Filter, Download, MoreHorizontal } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../UI/Cart"
import { Button } from "../UI/Button"
import { Input } from "../UI/Input"
import { Badge } from "../UI/Badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../UI/Table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../UI/DropDown"
import { Eye } from "lucide-react"

interface Order {
  id: string
  customer: string
  email: string
  amount: string
  status: string
  date: string
}

interface OrdersPageProps {
  orders?: Order[]
  onViewOrder?: (orderId: string) => void
  onDownloadInvoice?: (orderId: string) => void
  onCancelOrder?: (orderId: string) => void
  onSearch?: (query: string) => void
  onFilter?: () => void
  onExport?: () => void
}

export default function OrdersPage({
  orders,
  onViewOrder,
  onDownloadInvoice,
  onCancelOrder,
  onSearch,
  onFilter,
  onExport,
}: OrdersPageProps) {
  // Default data - replace with your API data
  const defaultOrders: Order[] = [
    {
      id: "#3210",
      customer: "John Doe",
      email: "john@example.com",
      amount: "$250.00",
      status: "completed",
      date: "2024-01-15",
    },
    {
      id: "#3209",
      customer: "Jane Smith",
      email: "jane@example.com",
      amount: "$150.00",
      status: "processing",
      date: "2024-01-15",
    },
    {
      id: "#3208",
      customer: "Bob Johnson",
      email: "bob@example.com",
      amount: "$350.00",
      status: "shipped",
      date: "2024-01-14",
    },
    {
      id: "#3207",
      customer: "Alice Brown",
      email: "alice@example.com",
      amount: "$75.00",
      status: "cancelled",
      date: "2024-01-14",
    },
    {
      id: "#3206",
      customer: "Mike Wilson",
      email: "mike@example.com",
      amount: "$420.00",
      status: "completed",
      date: "2024-01-13",
    },
    {
      id: "#3205",
      customer: "Sarah Davis",
      email: "sarah@example.com",
      amount: "$180.00",
      status: "processing",
      date: "2024-01-13",
    },
  ]

  const ordersData = orders || defaultOrders

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearch) {
      onSearch(e.target.value)
    }
  }

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
              <CardDescription>Complete list of customer orders</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Input placeholder="Search orders..." className="w-full sm:w-64" onChange={handleSearch} />
              <Button size="sm">Search</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[100px]">Order ID</TableHead>
                  <TableHead className="min-w-[150px]">Customer</TableHead>
                  <TableHead className="min-w-[100px]">Amount</TableHead>
                  <TableHead className="min-w-[100px]">Status</TableHead>
                  <TableHead className="min-w-[100px]">Date</TableHead>
                  <TableHead className="text-right min-w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ordersData.map((order, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{order.customer}</p>
                        <p className="text-sm text-gray-500 hidden sm:block">{order.email}</p>
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
                        <DropdownMenuTrigger >
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => onViewOrder?.(order.id)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onDownloadInvoice?.(order.id)}>
                            <Download className="mr-2 h-4 w-4" />
                            Download Invoice
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600" onClick={() => onCancelOrder?.(order.id)}>
                            Cancel Order
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
