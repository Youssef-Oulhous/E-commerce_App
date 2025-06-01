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
import { Package } from "lucide-react"

interface Product {
  id: string
  name: string
  category: string
  price: string
  stock: number
  status: string
  image: string
}

interface ProductsPageProps {
  products?: Product[]
  productStats?: {
    total: number
    outOfStock: number
    lowStock: number
  }
  onAddProduct?: () => void
  onEditProduct?: (productId: string) => void
  onViewProduct?: (productId: string) => void
  onDuplicateProduct?: (productId: string) => void
  onDeleteProduct?: (productId: string) => void
  onSearch?: (query: string) => void
  onFilter?: () => void
}

export default function ProductsPage({
  products,
  productStats,
  onAddProduct,
  onEditProduct,
  onViewProduct,
  onDuplicateProduct,
  onDeleteProduct,
  onSearch,
  onFilter,
}: ProductsPageProps) {
  // Default data - replace with your API data
  const defaultProducts: Product[] = [
    {
      id: "P001",
      name: "Wireless Headphones",
      category: "Electronics",
      price: "$199.99",
      stock: 45,
      status: "active",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=40&h=40&fit=crop&crop=center",
    },
    {
      id: "P002",
      name: "Smart Watch",
      category: "Wearables",
      price: "$299.99",
      stock: 23,
      status: "active",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=40&h=40&fit=crop&crop=center",
    },
    {
      id: "P003",
      name: "Laptop Stand",
      category: "Accessories",
      price: "$49.99",
      stock: 0,
      status: "out_of_stock",
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=40&h=40&fit=crop&crop=center",
    },
    {
      id: "P004",
      name: "USB-C Cable",
      category: "Cables",
      price: "$19.99",
      stock: 156,
      status: "active",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=40&h=40&fit=crop&crop=center",
    },
    {
      id: "P005",
      name: "Bluetooth Speaker",
      category: "Electronics",
      price: "$89.99",
      stock: 12,
      status: "active",
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=40&h=40&fit=crop&crop=center",
    },
    {
      id: "P006",
      name: "Phone Case",
      category: "Accessories",
      price: "$24.99",
      stock: 78,
      status: "active",
      image: "https://images.unsplash.com/photo-1601593346740-925612772716?w=40&h=40&fit=crop&crop=center",
    },
  ]

  const defaultStats = {
    total: 1234,
    outOfStock: 23,
    lowStock: 45,
  }

  const productsData = products || defaultProducts
  const statsData = productStats || defaultStats

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearch) {
      onSearch(e.target.value)
    }
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold">Products</h2>
          <p className="text-gray-500">Manage your product inventory</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={onFilter}>
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button size="sm" onClick={onAddProduct}>
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
            <div className="text-xl md:text-2xl font-bold">{statsData.total}</div>
            <p className="text-xs text-gray-500">+12 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">{statsData.outOfStock}</div>
            <p className="text-xs text-gray-500">-5 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">{statsData.lowStock}</div>
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
              <Input placeholder="Search products..." className="w-full sm:w-64" onChange={handleSearch} />
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
                {productsData.map((product, index) => (
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
                        <DropdownMenuTrigger >
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => onEditProduct?.(product.id)}>Edit Product</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onViewProduct?.(product.id)}>View Details</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onDuplicateProduct?.(product.id)}>
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600" onClick={() => onDeleteProduct?.(product.id)}>
                            Delete Product
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
