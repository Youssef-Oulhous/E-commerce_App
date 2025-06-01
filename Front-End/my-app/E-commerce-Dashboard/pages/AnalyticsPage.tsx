"use client"

import { Calendar, ChevronDown, Download, BarChart3, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../UI/Cart"
import { Button } from "../UI/Button"
import { Progress } from "../UI/Progress"

interface AnalyticsPageProps {
  analyticsData?: {
    conversionRate: string
    sessionDuration: string
    bounceRate: string
    returnCustomers: string
  }
  trafficSources?: Array<{
    source: string
    percentage: string
    value: number
  }>
  onExportReport?: () => void
  onDateRangeChange?: (range: string) => void
}

export default function AnalyticsPage({
  analyticsData,
  trafficSources,
  onExportReport,
  onDateRangeChange,
}: AnalyticsPageProps) {
  // Default data - replace with your API data
  const defaultAnalytics = {
    conversionRate: "3.2%",
    sessionDuration: "4m 32s",
    bounceRate: "42.3%",
    returnCustomers: "68%",
  }

  const defaultTrafficSources = [
    { source: "Organic Search", percentage: "45.2%", value: 45 },
    { source: "Direct", percentage: "32.1%", value: 32 },
    { source: "Social Media", percentage: "15.7%", value: 16 },
    { source: "Email", percentage: "7.0%", value: 7 },
  ]

  const analytics = analyticsData || defaultAnalytics
  const traffic = trafficSources || defaultTrafficSources

  return (
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
          <Button variant="outline" size="sm" className="w-full sm:w-auto" onClick={onExportReport}>
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
            <div className="text-xl md:text-2xl font-bold">{analytics.conversionRate}</div>
            <p className="text-xs text-green-500">+0.5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Session Duration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">{analytics.sessionDuration}</div>
            <p className="text-xs text-green-500">+12s from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">{analytics.bounceRate}</div>
            <p className="text-xs text-red-500">+2.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Return Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">{analytics.returnCustomers}</div>
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
              {traffic.map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{item.source}</span>
                    <span className="text-sm font-medium">{item.percentage}</span>
                  </div>
                  <Progress value={item.value} className="h-2 mt-2" />
                </div>
              ))}
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
}
