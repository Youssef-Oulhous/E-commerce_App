"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Menu, X, Package2, ChevronDown, Settings, Bell } from "lucide-react"
import { Button } from "./UI/Button"
import { Badge } from "./UI/Badge"
import { Input } from "./UI/Input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./UI/DropDown"
import { Search } from "lucide-react"

interface DashboardLayoutProps {
  children: React.ReactNode
  activeTab: string
  onTabChange: (tab: string) => void
  sidebarItems: Array<{
    id: string
    label: string
    icon: React.ComponentType<any>
    badge?: string
  }>
}

export default function DashboardLayout({ children, activeTab, onTabChange, sidebarItems }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

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

  const handleTabChange = (tabId: string) => {
    onTabChange(tabId)
    if (isMobile) {
      setSidebarOpen(false)
    }
  }

  const getPageDescription = () => {
    switch (activeTab) {
      case "overview":
        return "Welcome back! Here's what's happening with your store."
      case "orders":
        return "Track and manage all customer orders"
      case "products":
        return "Manage your product inventory and catalog"
      case "customers":
        return "View and manage customer relationships"
      case "analytics":
        return "Detailed insights and performance metrics"
      default:
        return ""
    }
  }

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
                  <Badge variant="secondary" className="text-md bg-red-500 text-white">
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
            <DropdownMenuTrigger >
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
                <p className="text-sm text-gray-500 hidden sm:block">{getPageDescription()}</p>
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
              <Button variant="outline" size="icon" className="sm:hidden">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
