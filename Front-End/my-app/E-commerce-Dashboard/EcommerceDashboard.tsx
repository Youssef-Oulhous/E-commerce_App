import {
  ArrowDown,
  ArrowUp,
  BarChart3,
  Bell,
  Calendar,
  ChevronDown,
  DollarSign,
  Download,
  Eye,
  Filter,
  Home,
  LineChart,
  Menu,
  MoreHorizontal,
  Package,
  Package2,
  Search,
  Settings,
  ShoppingBag,
  ShoppingCart,
  TrendingUp,
  Users,
  X,
} from "lucide-react"

import { useState, useEffect } from "react"

import { Badge } from "./UI/Badge"
import { Button } from "./UI/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./UI/Cart"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./UI/DropDown"
import { Input } from "./UI/Input"
import { Progress } from "./UI/Progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./UI/Table"

export default function ResponsiveEcommerceDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 768) {
        setSidebarOpen(false)
      }
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const sidebarItems = [
    { id: "overview", label: "Overview", icon: Home, active: true },
    { id: "orders", label: "Orders", icon: ShoppingCart, badge: "12" },
    { id: "products", label: "Products", icon: Package },
    { id: "customers", label: "Customers", icon: Users },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
  ]

  const stats = [
    {
      title: "Total Sales",
      value: "$45,231.89",
      change: "+20.1%",
      trend: "up",
      icon: DollarSign,
      description: "from last month",
    },
    {
      title: "Total Orders",
      value: "2,350",
      change: "+15.3%",
      trend: "up",
      icon: ShoppingBag,
      description: "from last month",
    },
    {
      title: "Cancelled Orders",
      value: "89",
      change: "-5.2%",
      trend: "down",
      icon: X,
      description: "from last month",
    },
    {
      title: "Active Customers",
      value: "1,429",
      change: "+12.5%",
      trend: "up",
      icon: Users,
      description: "from last month",
    },
  ]

  const topProducts = [
    {
      name: "Wireless Headphones",
      sales: 1234,
      revenue: "$24,680",
      image: "/placeholder.svg?height=40&width=40",
      trend: "+12%",
    },
    {
      name: "Smart Watch",
      sales: 987,
      revenue: "$19,740",
      image: "/placeholder.svg?height=40&width=40",
      trend: "+8%",
    },
    {
      name: "Laptop Stand",
      sales: 756,
      revenue: "$15,120",
      image: "/placeholder.svg?height=40&width=40",
      trend: "+15%",
    },
    {
      name: "USB-C Cable",
      sales: 654,
      revenue: "$6,540",
      image: "/placeholder.svg?height=40&width=40",
      trend: "+5%",
    },
    {
      name: "Phone Case",
      sales: 543,
      revenue: "$5,430",
      image: "/placeholder.svg?height=40&width=40",
      trend: "+3%",
    },
  ]

  const recentOrders = [
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
  ]

  const products = [
    {
      id: "P001",
      name: "Wireless Headphones",
      category: "Electronics",
      price: "$199.99",
      stock: 45,
      status: "active",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "P002",
      name: "Smart Watch",
      category: "Wearables",
      price: "$299.99",
      stock: 23,
      status: "active",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "P003",
      name: "Laptop Stand",
      category: "Accessories",
      price: "$49.99",
      stock: 0,
      status: "out_of_stock",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "P004",
      name: "USB-C Cable",
      category: "Cables",
      price: "$19.99",
      stock: 156,
      status: "active",
      image: "/placeholder.svg?height=40&width=40",
    },
  ]

  const customers = [
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
  ]

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
    if (isMobile) {
      setSidebarOpen(false)
    }
  }

  const renderOverview = () => (
    <div className="space-y-4 md:space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-xl md:text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs text-gray-500">
                {stat.trend === "up" ? (
                  <ArrowUp className="mr-1 h-3 w-3 text-green-500" />
                ) : (
                  <ArrowDown className="mr-1 h-3 w-3 text-red-500" />
                )}
                <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>{stat.change}</span>
                <span className="ml-1">{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:gap-6 grid-cols-1 lg:grid-cols-7">
        {/* Sales Chart */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">Sales Overview</CardTitle>
            <CardDescription>Monthly sales performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] md:h-[300px] flex items-center justify-center bg-gray-50 rounded">
              <div className="text-center">
                <LineChart className="h-8 w-8 md:h-12 md:w-12 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-500">Sales Chart Visualization</p>
                <p className="text-xs text-gray-400 hidden md:block">Interactive line chart showing monthly trends</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">Top Selling Products</CardTitle>
            <CardDescription>Best performing products this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 md:space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center space-x-3 md:space-x-4">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-8 h-8 md:w-10 md:h-10 rounded object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.sales} sales</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{product.revenue}</p>
                    <p className="text-xs text-green-500">{product.trend}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:gap-6 grid-cols-1 lg:grid-cols-2">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">Recent Orders</CardTitle>
            <CardDescription>Latest customer orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 md:space-y-4">
              {recentOrders.slice(0, 4).map((order, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{order.id}</p>
                    <p className="text-xs text-gray-500">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{order.amount}</p>
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
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">Revenue Breakdown</CardTitle>
            <CardDescription>Revenue by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 md:space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Electronics</span>
                  <span>$18,500</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Accessories</span>
                  <span>$12,300</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Clothing</span>
                  <span>$8,900</span>
                </div>
                <Progress value={45} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Home & Garden</span>
                  <span>$5,500</span>
                </div>
                <Progress value={30} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderOrders = () => (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold">Orders</h2>
          <p className="text-gray-500">Manage and track all customer orders</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
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
              <Input placeholder="Search orders..." className="w-full sm:w-64" />
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
                {recentOrders.map((order, index) => (
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
                        <DropdownMenuTrigger>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Download Invoice
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">Cancel Order</DropdownMenuItem>
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

  const renderProducts = () => (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold">Products</h2>
          <p className="text-gray-500">Manage your product inventory</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button size="sm">
            <Package className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>
      </div>

      <div className="grid gap-3 md:gap-4 grid-cols-1 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">1,234</div>
            <p className="text-xs text-gray-500">+12 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">23</div>
            <p className="text-xs text-gray-500">-5 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">45</div>
            <p className="text-xs text-gray-500">+8 from last week</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-lg md:text-xl">Product Inventory</CardTitle>
              <CardDescription>Manage your product catalog</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Input placeholder="Search products..." className="w-full sm:w-64" />
              <Button size="sm">Search</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[200px]">Product</TableHead>
                  <TableHead className="min-w-[120px]">Category</TableHead>
                  <TableHead className="min-w-[100px]">Price</TableHead>
                  <TableHead className="min-w-[80px]">Stock</TableHead>
                  <TableHead className="min-w-[100px]">Status</TableHead>
                  <TableHead className="text-right min-w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-8 h-8 md:w-10 md:h-10 rounded object-cover"
                        />
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-gray-500">{product.id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>
                      <span
                        className={product.stock === 0 ? "text-red-500" : product.stock < 20 ? "text-yellow-500" : ""}
                      >
                        {product.stock}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={product.status === "active" ? "default" : "destructive"}>
                        {product.status === "active" ? "Active" : "Out of Stock"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit Product</DropdownMenuItem>
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Duplicate</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">Delete Product</DropdownMenuItem>
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

  const renderCustomers = () => (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold">Customers</h2>
          <p className="text-gray-500">Manage customer relationships</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
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
            <div className="text-xl md:text-2xl font-bold">2,847</div>
            <p className="text-xs text-gray-500">+180 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">1,429</div>
            <p className="text-xs text-gray-500">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">VIP Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">89</div>
            <p className="text-xs text-gray-500">+5 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Order Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">$156</div>
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
              <Input placeholder="Search customers..." className="w-full sm:w-64" />
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
                {customers.map((customer, index) => (
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
                        <DropdownMenuTrigger>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>Order History</DropdownMenuItem>
                          <DropdownMenuItem>Send Email</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">Block Customer</DropdownMenuItem>
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

  const renderAnalytics = () => (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold">Analytics</h2>
          <p className="text-gray-500">Detailed insights and reports</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <Calendar className="mr-2 h-4 w-4" />
            Last 30 days
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid gap-3 md:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">3.2%</div>
            <p className="text-xs text-green-500">+0.5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Session Duration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">4m 32s</div>
            <p className="text-xs text-green-500">+12s from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">42.3%</div>
            <p className="text-xs text-red-500">+2.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Return Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">68%</div>
            <p className="text-xs text-green-500">+5% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:gap-6 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">Traffic Sources</CardTitle>
            <CardDescription>Where your visitors come from</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Organic Search</span>
                <span className="text-sm font-medium">45.2%</span>
              </div>
              <Progress value={45} className="h-2" />

              <div className="flex items-center justify-between">
                <span className="text-sm">Direct</span>
                <span className="text-sm font-medium">32.1%</span>
              </div>
              <Progress value={32} className="h-2" />

              <div className="flex items-center justify-between">
                <span className="text-sm">Social Media</span>
                <span className="text-sm font-medium">15.7%</span>
              </div>
              <Progress value={16} className="h-2" />

              <div className="flex items-center justify-between">
                <span className="text-sm">Email</span>
                <span className="text-sm font-medium">7.0%</span>
              </div>
              <Progress value={7} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">Sales by Category</CardTitle>
            <CardDescription>Revenue breakdown by product category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[180px] md:h-[200px] flex items-center justify-center bg-gray-50 rounded">
              <div className="text-center">
                <BarChart3 className="h-8 w-8 md:h-12 md:w-12 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-500">Pie Chart Visualization</p>
                <p className="text-xs text-gray-400 hidden md:block">Category sales distribution</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Performance Metrics</CardTitle>
          <CardDescription>Key performance indicators over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[250px] md:h-[300px] flex items-center justify-center bg-gray-50 rounded">
            <div className="text-center">
              <TrendingUp className="h-8 w-8 md:h-12 md:w-12 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-500">Multi-line Chart Visualization</p>
              <p className="text-xs text-gray-400 hidden md:block">Revenue, Orders, and Customer trends</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && isMobile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`
        ${isMobile ? "fixed" : "relative"} 
        ${isMobile && !sidebarOpen ? "-translate-x-full" : "translate-x-0"}
        w-64 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 ease-in-out z-50
        ${isMobile ? "h-full" : "h-screen"}
      `}
      >
        {/* Logo */}
        <div className="p-4 md:p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Package2 className="h-6 w-6 md:h-8 md:w-8 text-blue-600" />
              <span className="text-lg md:text-xl font-bold">EcomDash</span>
            </div>
            {isMobile && (
              <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)} className="md:hidden">
                <X className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 md:p-4">
          <div className="space-y-1 md:space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 text-left rounded-lg transition-colors ${
                  activeTab === item.id
                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="h-4 w-4 md:h-5 md:w-5" />
                  <span className="font-medium text-sm md:text-base">{item.label}</span>
                </div>
                {item.badge && (
                  <Badge variant="secondary" className="text-xs">
                    {item.badge}
                  </Badge>
                )}
              </button>
            ))}
          </div>
        </nav>

        {/* User Profile */}
        <div className="p-3 md:p-4 border-t border-gray-200">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="ghost" className="w-full justify-start p-2">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 md:w-8 md:h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs md:text-sm font-medium">JD</span>
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-xs text-gray-500">Admin</p>
                  </div>
                </div>
                <ChevronDown className="ml-auto h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {isMobile && (
                <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(true)} className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              )}
              <div>
                <h1 className="text-lg md:text-2xl font-bold text-gray-900 capitalize">{activeTab}</h1>
                <p className="text-sm text-gray-500 hidden sm:block">
                  {activeTab === "overview" && "Welcome back! Here's what's happening with your store."}
                  {activeTab === "orders" && "Track and manage all customer orders"}
                  {activeTab === "products" && "Manage your product inventory and catalog"}
                  {activeTab === "customers" && "View and manage customer relationships"}
                  {activeTab === "analytics" && "Detailed insights and performance metrics"}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 md:space-x-4">
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input placeholder="Search..." className="pl-10 w-48 md:w-64" />
              </div>
              <Button variant="outline" size="icon" className="hidden sm:flex">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="hidden sm:flex">
                <Settings className="h-4 w-4" />
              </Button>
              {/* Mobile search button */}
              <Button variant="outline" size="icon" className="sm:hidden">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          {activeTab === "overview" && renderOverview()}
          {activeTab === "orders" && renderOrders()}
          {activeTab === "products" && renderProducts()}
          {activeTab === "customers" && renderCustomers()}
          {activeTab === "analytics" && renderAnalytics()}
        </main>
      </div>
    </div>
  )
}
