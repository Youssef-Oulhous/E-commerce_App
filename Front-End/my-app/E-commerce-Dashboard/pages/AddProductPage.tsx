import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../UI/Cart"
import { Button } from "../UI/Button"
import { Input } from "../UI/Input"
import { Textarea } from "../UI/Textarea"
import { Label } from "../UI/Label"
import { productService } from "../services/apiService"
import { toast } from "react-hot-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../UI/Tabs"

interface ProductFormData {
  name: string
  description: string
  features: string[]
  price: number
  category: string
  stock: number
  image: string
  brand: string
}

export default function AddProductPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState("")
  const [previewUrl, setPreviewUrl] = useState("")
  const [activeTab, setActiveTab] = useState("upload")
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    description: "",
    features: [],
    price: 0,
    category: "",
    stock: 0,
    image: "",
    brand: ""
  })
  const [featureInput, setFeatureInput] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? Number(value) : value
    }))
  }

  const handleAddFeature = () => {
    if (featureInput.trim()) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, featureInput.trim()]
      }))
      setFeatureInput("")
    }
  }

  const handleRemoveFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formDataToSend = new FormData()
      
      // Add all form fields
      formDataToSend.append("name", formData.name)
      formDataToSend.append("description", formData.description)
      formDataToSend.append("features", JSON.stringify(formData.features))
      formDataToSend.append("price", formData.price.toString())
      formDataToSend.append("category", formData.category)
      formDataToSend.append("stock", formData.stock.toString())
      formDataToSend.append("brand", formData.brand)
      
      // Add image based on the active tab
      if (activeTab === "upload" && imageFile) {
        formDataToSend.append("image", imageFile)
      } else if (activeTab === "url" && imageUrl) {
        formDataToSend.append("imageUrl", imageUrl)
      }

      const response = await productService.createProduct(formDataToSend)
      toast.success("Product created successfully!")
      
      // Add a small delay before navigation
      setTimeout(() => {
        try {
          navigate("/dashboard/products", { replace: true })
        } catch (navError) {
          console.error("Navigation error:", navError)
          toast.error("Error navigating to products page")
          // Fallback navigation
          window.location.href = "/dashboard/products"
        }
      }, 1000)
    } catch (error) {
      console.error("Error creating product:", error)
      toast.error(error instanceof Error ? error.message : "Failed to create product")
    } finally {
      setLoading(false)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value
    setImageUrl(url)
    setPreviewUrl(url)
  }

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Product</CardTitle>
          <CardDescription>Create a new product in your store</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter product name"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter product description"
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter product category"
                  />
                </div>

                <div>
                  <Label htmlFor="brand">Brand</Label>
                  <Input
                    id="brand"
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    placeholder="Enter product brand"
                  />
                </div>
              </div>

              {/* Pricing and Stock */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter product price"
                  />
                </div>

                <div>
                  <Label htmlFor="stock">Stock</Label>
                  <Input
                    id="stock"
                    name="stock"
                    type="number"
                    min="0"
                    value={formData.stock}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter stock quantity"
                  />
                </div>

                <div>
                  <Label htmlFor="features">Features (JSON)</Label>
                  <Textarea
                    id="features"
                    name="features"
                    placeholder='["Feature 1", "Feature 2"]'
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Label>Product Image</Label>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="upload">Upload Image</TabsTrigger>
                  <TabsTrigger value="url">Image URL</TabsTrigger>
                </TabsList>
                <TabsContent value="upload">
                  <div className="space-y-4">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="cursor-pointer"
                    />
                  </div>
                </TabsContent>
                <TabsContent value="url">
                  <div className="space-y-4">
                    <Input
                      type="url"
                      placeholder="Enter image URL"
                      value={imageUrl}
                      onChange={handleUrlChange}
                    />
                  </div>
                </TabsContent>
              </Tabs>

              {previewUrl && (
                <div className="mt-4">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/dashboard/products")}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Creating..." : "Create Product"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 