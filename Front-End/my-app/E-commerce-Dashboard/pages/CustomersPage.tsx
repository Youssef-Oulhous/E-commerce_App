"use client"

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

interface Customer {
  id: string
  name: string
  email: string
  orders: number
  spent: string
  joined: string
  status: string
}

interface CustomersPageProps {
  customers?: Customer[]
  customerStats?: {
    total: number
    active: number
    vip: number
    avgOrderValue: string
  }
  onViewProfile?: (customerId: string) => void
  onViewOrderHistory?: (customerId: string) => void
  onSendEmail?: (customerId: string) => void
  onBlockCustomer?: (customerId: string) => void
  onSearch?: (query: string) => void
  onFilter?: () => void
  onExport?: () => void
}

export default function CustomersPage({
  customers,
  customerStats,
  onViewProfile,
  onViewOrderHistory,
  onSendEmail,
  onBlockCustomer,
  onSearch,
  onFilter,
  onExport,
}: CustomersPageProps) {
  // Default data - replace with your API data
  const defaultCustomers: Customer[] = [
    {
      id: "C001",
      name: "John Doe",
      email: "john@example.com",
      orders: 12,
      spent: "$2,450.00",
      joined: "2023-06-15",
      status: "active",
    },
    {
      id: "C002",
      name: "Jane Smith",
      email: "jane@example.com",
      orders: 8,
      spent: "$1,230.00",
      joined: "2023-08-22",
      status: "active",
    },
    {
      id: "C003",
      name: "Bob Johnson",
      email: "bob@example.com",
      orders: 15,
      spent: "$3,670.00",
      joined: "2023-03-10",
      status: "vip",
    },
    {
      id: "C004",
      name: "Alice Brown",
      email: "alice@example.com",
      orders: 3,
      spent: "$450.00",
      joined: "2024-01-05",
      status: "new",
    },
    {
      id: "C005",
      name: "Charlie Wilson",
      email: "charlie@example.com",
      orders: 7,
      spent: "$890.00",
      joined: "2023-11-12",
      status: "active",
    },
    {
      id: "C006",
      name: "Diana Martinez",
      email: "diana@example.com",
      orders: 20,
      spent: "$4,200.00",
      joined: "2023-01-20",
      status: "vip",
    },
  ]

  const defaultStats = {
    total: 2847,
    active: 1429,
    vip: 89,
    avgOrderValue: "$156",
  }

  const customersData = customers || defaultCustomers
  const statsData = customerStats || defaultStats

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearch) {
      onSearch(e.target.value)
    }
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold">Customers</h2>
          <p className="text-gray-500">Manage customer relationships</p>
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

      <div className="grid gap-3 md:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">{statsData.total}</div>
            <p className="text-xs text-gray-500">+180 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">{statsData.active}</div>
            <p className="text-xs text-gray-500">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">VIP Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">{statsData.vip}</div>
            <p className="text-xs text-gray-500">+5 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Order Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">{statsData.avgOrderValue}</div>
            <p className="text-xs text-gray-500">+8% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-lg md:text-xl">Customer List</CardTitle>
              <CardDescription>All registered customers</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Input placeholder="Search customers..." className="w-full sm:w-64" onChange={handleSearch} />
              <Button size="sm">Search</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[200px]">Customer</TableHead>
                  <TableHead className="min-w-[80px]">Orders</TableHead>
                  <TableHead className="min-w-[120px]">Total Spent</TableHead>
                  <TableHead className="min-w-[100px]">Joined</TableHead>
                  <TableHead className="min-w-[100px]">Status</TableHead>
                  <TableHead className="text-right min-w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customersData.map((customer, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-sm text-gray-500 hidden sm:block">{customer.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>{customer.orders}</TableCell>
                    <TableCell>{customer.spent}</TableCell>
                    <TableCell>{customer.joined}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          customer.status === "vip"
                            ? "default"
                            : customer.status === "active"
                              ? "secondary"
                              : customer.status === "new"
                                ? "outline"
                                : "destructive"
                        }
                      >
                        {customer.status.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger >
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => onViewProfile?.(customer.id)}>View Profile</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onViewOrderHistory?.(customer.id)}>
                            Order History
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onSendEmail?.(customer.id)}>Send Email</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600" onClick={() => onBlockCustomer?.(customer.id)}>
                            Block Customer
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
