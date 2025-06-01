

import { useState } from "react"
import { Home, ShoppingCart, Package, Users, BarChart3 } from "lucide-react"
import DashboardLayout from "./DashboardLayout"
import OverviewPage from "./pages/OverviewPage"
import OrdersPage from "./pages/OrdersPage"
import ProductsPage from "./pages/ProductsPage"
import CustomersPage from "./pages/CustomersPage"
import AnalyticsPage from "./pages/AnalyticsPage"

export default function MainDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const sidebarItems = [
    { id: "overview", label: "Overview", icon: Home },
    { id: "orders", label: "Orders", icon: ShoppingCart, badge: "12" },
    { id: "products", label: "Products", icon: Package },
    { id: "customers", label: "Customers", icon: Users },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
  ]

  // API Integration Examples - Replace these with your actual API calls
  const handleOrderActions = {
    onViewOrder: (orderId: string) => {
      console.log("View order:", orderId)
      // Call your API: fetch(`/api/orders/${orderId}`)
    },
    onDownloadInvoice: (orderId: string) => {
      console.log("Download invoice:", orderId)
      // Call your API: fetch(`/api/orders/${orderId}/invoice`)
    },
    onCancelOrder: (orderId: string) => {
      console.log("Cancel order:", orderId)
      // Call your API: fetch(`/api/orders/${orderId}/cancel`, { method: 'POST' })
    },
    onSearch: (query: string) => {
      console.log("Search orders:", query)
      // Call your API: fetch(`/api/orders/search?q=${query}`)
    },
    onFilter: () => {
      console.log("Filter orders")
      // Open filter modal or call API
    },
    onExport: () => {
      console.log("Export orders")
      // Call your API: fetch('/api/orders/export')
    },
  }

  const handleProductActions = {
    onAddProduct: () => {
      console.log("Add product")
      // Navigate to add product page or open modal
      // window.location.href = '/products/add'
    },
    onEditProduct: (productId: string) => {
      console.log("Edit product:", productId)
      // Navigate to edit page: window.location.href = `/products/edit/${productId}`
    },
    onViewProduct: (productId: string) => {
      console.log("View product:", productId)
      // Call your API: fetch(`/api/products/${productId}`)
    },
    onDuplicateProduct: (productId: string) => {
      console.log("Duplicate product:", productId)
      // Call your API: fetch(`/api/products/${productId}/duplicate`, { method: 'POST' })
    },
    onDeleteProduct: (productId: string) => {
      console.log("Delete product:", productId)
      // Call your API: fetch(`/api/products/${productId}`, { method: 'DELETE' })
    },
    onSearch: (query: string) => {
      console.log("Search products:", query)
      // Call your API: fetch(`/api/products/search?q=${query}`)
    },
    onFilter: () => {
      console.log("Filter products")
      // Open filter modal
    },
  }

  const handleCustomerActions = {
    onViewProfile: (customerId: string) => {
      console.log("View profile:", customerId)
      // Navigate to customer profile: window.location.href = `/customers/${customerId}`
    },
    onViewOrderHistory: (customerId: string) => {
      console.log("View order history:", customerId)
      // Call your API: fetch(`/api/customers/${customerId}/orders`)
    },
    onSendEmail: (customerId: string) => {
      console.log("Send email:", customerId)
      // Open email composer or call API
    },
    onBlockCustomer: (customerId: string) => {
      console.log("Block customer:", customerId)
      // Call your API: fetch(`/api/customers/${customerId}/block`, { method: 'POST' })
    },
    onSearch: (query: string) => {
      console.log("Search customers:", query)
      // Call your API: fetch(`/api/customers/search?q=${query}`)
    },
    onFilter: () => {
      console.log("Filter customers")
    },
    onExport: () => {
      console.log("Export customers")
      // Call your API: fetch('/api/customers/export')
    },
  }

  const handleAnalyticsActions = {
    onExportReport: () => {
      console.log("Export analytics report")
      // Call your API: fetch('/api/analytics/export')
    },
    onDateRangeChange: (range: string) => {
      console.log("Date range changed:", range)
      // Call your API: fetch(`/api/analytics?range=${range}`)
    },
  }

  const renderPage = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewPage />
      case "orders":
        return <OrdersPage {...handleOrderActions} />
      case "products":
        return <ProductsPage {...handleProductActions} />
      case "customers":
        return <CustomersPage {...handleCustomerActions} />
      case "analytics":
        return <AnalyticsPage {...handleAnalyticsActions} />
      default:
        return <OverviewPage />
    }
  }

  return (
    <DashboardLayout activeTab={activeTab} onTabChange={setActiveTab} sidebarItems={sidebarItems}>
      {renderPage()}
    </DashboardLayout>
  )
}
