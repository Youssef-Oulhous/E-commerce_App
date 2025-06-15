import type React from "react"
import { ArrowDown, ArrowUp, DollarSign, ShoppingBag, X, Users, LineChart } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../UI/Cart"
import { Badge } from "../UI/Badge"
import { Progress } from "../UI/Progress"
import axios from "axios"
import { LucideIcon } from "lucide-react";
import { useState , useEffect} from "react"

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
interface TotalSales{
    totalOrders: number;
    complitedOrder:number;
    cancelledOrders: number;
    pendingOrders: number;
    totalSales: number;
}

interface Stat {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  icon: React.ComponentType<any>
  description: string
}

type DashboardData = {
  stats: Stat[];
  topProducts: any[]; // You can strongly type this later
  recentOrders: any[];
};

type TopProduct = {
  name: string;
  totalSold: number;
  totalRevenue: string; // formatted as $xx.xx
  image: string;
  trend: string; // e.g. "+5.4%"
};

type RecentOrder = {
  id: number; // Assuming `orderNumber` is a number
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
};

export default function OverviewPage({ stats, topProducts, recentOrders }: OverviewPageProps) {
  // Default data - replace with your API data
  const [StatsData, setStatsData] = useState<Stat[]>([]);
  const [TopProducts, setTopProducts] = useState<TopProduct[]>([]);
  const [RecentOrders, setRecentOrders] = useState<RecentOrder[]>([]);

  const fetchData = async ():Promise<DashboardData> => {
    try {
      const response = await axios.get<TotalSales>("http://localhost:5500/api/orders/dashboard-stats");
      const data = response.data;
      return {
        stats: [
          {
            title: "Total Sales",
            value: `$${data.totalSales.toFixed(2)}`,
            change: "+20.1%",
            trend: "up" as const,
            icon: DollarSign,
            description: "from last month",
          },
          {
            title: "Total Orders",
            value: data.totalOrders.toString(),
            change: "+15.3%",
            trend: "up" as const,
            icon: ShoppingBag,
            description: "from last month",
          },
          {
            title: "Cancelled Orders",
            value: data.cancelledOrders.toString(),
            change: "-5.2%",
            trend: "down" as const,
            icon: X,
            description: "from last month",
          },
          {
            title: "Active Customers",
            value: (data.totalOrders - data.cancelledOrders).toString(),
            change: "+12.5%",
            trend: "up" as const,
            icon: Users,
            description: "from last month",
          },
        ],
        topProducts: [], // Fetch or define your top products
        recentOrders: [], 
      };
    } catch (error) {
      console.error("Error fetching overview data:", error);
      return {
        stats: [],
        topProducts: [],
        recentOrders: [],
      };
    }
  };

  useEffect(() => {
  const loadData = async () => {
    try {
      const data: DashboardData = await fetchData();
      setStatsData(data.stats);
    } catch (err) {
      console.error("Failed to fetch dashboard stats", err);
    }
  };

  loadData();
}, []);




const fetchTopProducts = async (): Promise<TopProduct[]>  => { // this function fetches top products from the API
  try {
    const response = await axios.get("http://localhost:5500/api/orders/top-products");
    return response.data.map((product: any) => ({
      name: product.name,
      totalSold: product.totalSold,
      totalRevenue: `$${product.totalRevenue.toFixed(2)}`,
      image: product.image || "https://via.placeholder.com/40",
      trend: `+${product.trendPercentage}%`,
    }));
  } catch (error) {
    console.error("Error fetching top products:", error);
    return[]
   
  }
};


useEffect(() => {
  const loadTopProducts = async () => {
    const products = await fetchTopProducts();
    setTopProducts(products);
  };

  loadTopProducts();
}, []);


const fetchRecentOrders = async (): Promise<RecentOrder[]> => {
  try {
    const response = await axios.get<RecentOrdersResponse>("http://localhost:5500/api/orders/recent");

    const orders = response.data.orders;

    return orders.map((order) => ({
      id: order.orderNumber,
      customer: order.user.name,
      email: order.user.email,
      amount: `$${order.totalAmount.toFixed(2)}`,
      status: order.status,
      date: new Date(order.createdAt).toLocaleDateString(),
    }));
  } catch (error) {
    console.error("Error fetching recent orders:", error);
    return [];
  }
};

 
useEffect(() => {
  const loadRecentOrders = async () => {
    const orders = await fetchRecentOrders();
    setRecentOrders(orders);
  };

  loadRecentOrders();
}, []);

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {StatsData.map((stat) => (
          <Card key={stat.title} className="flex flex-col justify-between">
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
              {TopProducts.map((product, index) => (
                <div key={index} className="flex items-center space-x-3 md:space-x-4">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-8 h-8 md:w-10 md:h-10 rounded object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.totalSold} sales</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{product.totalRevenue}</p>
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
              {RecentOrders.slice(0, 5).map((order, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">#{order.id}</p>
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
