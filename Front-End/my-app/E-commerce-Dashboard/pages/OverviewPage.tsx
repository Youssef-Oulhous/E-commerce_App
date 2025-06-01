import type React from "react"
import { ArrowDown, ArrowUp, DollarSign, ShoppingBag, X, Users, LineChart } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../UI/Cart"
import { Badge } from "../UI/Badge"
import { Progress } from "../UI/Progress"

interface OverviewPageProps {
  stats?: Array<{
    title: string
    value: string
    change: string
    trend: "up" | "down"
    icon: React.ComponentType<any>
    description: string
  }>
  topProducts?: Array<{
    name: string
    sales: number
    revenue: string
    image: string
    trend: string
  }>
  recentOrders?: Array<{
    id: string
    customer: string
    email: string
    amount: string
    status: string
    date: string
  }>
}

export default function OverviewPage({ stats, topProducts, recentOrders }: OverviewPageProps) {
  // Default data - replace with your API data
  const defaultStats = [
    {
      title: "Total Sales",
      value: "$45,231.89",
      change: "+20.1%",
      trend: "up" as const,
      icon: DollarSign,
      description: "from last month",
    },
    {
      title: "Total Orders",
      value: "2,350",
      change: "+15.3%",
      trend: "up" as const,
      icon: ShoppingBag,
      description: "from last month",
    },
    {
      title: "Cancelled Orders",
      value: "89",
      change: "-5.2%",
      trend: "down" as const,
      icon: X,
      description: "from last month",
    },
    {
      title: "Active Customers",
      value: "1,429",
      change: "+12.5%",
      trend: "up" as const,
      icon: Users,
      description: "from last month",
    },
  ]

  const defaultTopProducts = [
    {
      name: "Wireless Headphones",
      sales: 1234,
      revenue: "$24,680",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=40&h=40&fit=crop&crop=center",
      trend: "+12%",
    },
    {
      name: "Smart Watch",
      sales: 987,
      revenue: "$19,740",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=40&h=40&fit=crop&crop=center",
      trend: "+8%",
    },
    {
      name: "Laptop Stand",
      sales: 756,
      revenue: "$15,120",
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=40&h=40&fit=crop&crop=center",
      trend: "+15%",
    },
    {
      name: "USB-C Cable",
      sales: 654,
      revenue: "$6,540",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=40&h=40&fit=crop&crop=center",
      trend: "+5%",
    },
    {
      name: "Phone Case",
      sales: 543,
      revenue: "$5,430",
      image: "https://images.unsplash.com/photo-1601593346740-925612772716?w=40&h=40&fit=crop&crop=center",
      trend: "+3%",
    },
  ]

  const defaultRecentOrders = [
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

  const statsData = stats || defaultStats
  const topProductsData = topProducts || defaultTopProducts
  const recentOrdersData = recentOrders || defaultRecentOrders

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat, index) => (
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
              {topProductsData.map((product, index) => (
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
              {recentOrdersData.slice(0, 4).map((order, index) => (
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
}
