import { useState, useEffect } from "react";
import { productAPI } from "../lib/api";
import { uploadAPI } from "../lib/api";

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  brand: string;
  rating: number;
  image: string;
  features: string;
  quantity: number;
};

export default function ProductManagement() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingNew, setIsAddingNew] = useState<boolean>(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: "",
    description: "",
    price: 0,
    category: "",
    stock: 0,
    brand: "",
    rating: 0,
    features: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Fetch products
  useEffect(() => {
    setIsLoading(true);
    productAPI.getAllProducts(currentPage, 10)
      .then((res) => {
        setProducts(res.data.products);
        setTotalPages(res.data.totalPages);
        setIsLoading(false);
      })
      .catch((err) => {
        setError("Failed to load products");
        setIsLoading(false);
        console.error(err);
      });
  }, [currentPage]);

  // Handle input changes for new product
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (editingProduct) {
      setEditingProduct({
        ...editingProduct,
        [name]: name === "price" || name === "stock" || name === "rating" ? Number(value) : value,
      });
    } else {
      setNewProduct({
        ...newProduct,
        [name]: name === "price" || name === "stock" || name === "rating" ? Number(value) : value,
      });
    }
  };

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  // Add new product
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      let imageUrl = "";
      
      // Upload image if selected
      if (file) {
        const uploadResponse = await uploadAPI.uploadFile(file);
        imageUrl = uploadResponse.data.filename;
      }
      
      // Create product with image URL
      const productData = {
        ...newProduct,
        image: imageUrl,
      };
      
      const response = await productAPI.createProduct(productData);
      
      setProducts([...products, response.data]);
      setNewProduct({
        name: "",
        description: "",
        price: 0,
        category: "",
        stock: 0,
        brand: "",
        rating: 0,
        features: "",
      });
      setFile(null);
      setIsAddingNew(false);
      setSuccess("Product added successfully!");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError("Failed to add product");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Update product
  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      let imageUrl = editingProduct.image;
      
      // Upload new image if selected
      if (file) {
        const uploadResponse = await uploadAPI.uploadFile(file);
        imageUrl = uploadResponse.data.filename;
      }
      
      // Update product with potential new image URL
      const productData = {
        ...editingProduct,
        image: imageUrl,
      };
      
      await productAPI.updateProduct(editingProduct._id, productData);
      
      setProducts(products.map(p => p._id === editingProduct._id ? productData as Product : p));
      setEditingProduct(null);
      setFile(null);
      setSuccess("Product updated successfully!");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError("Failed to update product");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete product
  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      await productAPI.deleteProduct(id);
      setProducts(products.filter(p => p._id !== id));
      setSuccess("Product deleted successfully!");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError("Failed to delete product");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Product Management</h1>
      
      {/* Success/Error Messages */}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 mb-4 rounded">
          {success}
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-4 rounded">
          {error}
        </div>
      )}
      
      {/* Add Product Button */}
      {!isAddingNew && !editingProduct && (
        <button 
          onClick={() => setIsAddingNew(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mb-6"
        >
          Add New Product
        </button>
      )}
      
      {/* Add New Product Form */}
      {isAddingNew && (
        <div className="bg-gray-100 p-6 mb-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
          <form onSubmit={handleAddProduct} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={newProduct.name || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              
              <div>
                <label className="block mb-1">Brand</label>
                <input
                  type="text"
                  name="brand"
                  value={newProduct.brand || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              
              <div>
                <label className="block mb-1">Price</label>
                <input
                  type="number"
                  name="price"
                  value={newProduct.price || 0}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              
              <div>
                <label className="block mb-1">Category</label>
                <input
                  type="text"
                  name="category"
                  value={newProduct.category || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              
              <div>
                <label className="block mb-1">Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={newProduct.stock || 0}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              
              <div>
                <label className="block mb-1">Rating</label>
                <input
                  type="number"
                  name="rating"
                  value={newProduct.rating || 0}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  step="0.1"
                  min="0"
                  max="5"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block mb-1">Description</label>
              <textarea
                name="description"
                value={newProduct.description || ""}
                onChange={handleInputChange}
                className="w-full p-2 border rounded h-24"
                required
              ></textarea>
            </div>
            
            <div>
              <label className="block mb-1">Features</label>
              <textarea
                name="features"
                value={newProduct.features || ""}
                onChange={handleInputChange}
                className="w-full p-2 border rounded h-24"
              ></textarea>
            </div>
            
            <div>
              <label className="block mb-1">Image</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full p-2"
              />
            </div>
            
            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                disabled={isLoading}
              >
                {isLoading ? "Adding..." : "Add Product"}
              </button>
              <button
                type="button"
                onClick={() => setIsAddingNew(false)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Edit Product Form */}
      {editingProduct && (
        <div className="bg-gray-100 p-6 mb-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
          <form onSubmit={handleUpdateProduct} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={editingProduct.name || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              
              <div>
                <label className="block mb-1">Brand</label>
                <input
                  type="text"
                  name="brand"
                  value={editingProduct.brand || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              
              <div>
                <label className="block mb-1">Price</label>
                <input
                  type="number"
                  name="price"
                  value={editingProduct.price || 0}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              
              <div>
                <label className="block mb-1">Category</label>
                <input
                  type="text"
                  name="category"
                  value={editingProduct.category || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              
              <div>
                <label className="block mb-1">Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={editingProduct.stock || 0}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              
              <div>
                <label className="block mb-1">Rating</label>
                <input
                  type="number"
                  name="rating"
                  value={editingProduct.rating || 0}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  step="0.1"
                  min="0"
                  max="5"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block mb-1">Description</label>
              <textarea
                name="description"
                value={editingProduct.description || ""}
                onChange={handleInputChange}
                className="w-full p-2 border rounded h-24"
                required
              ></textarea>
            </div>
            
            <div>
              <label className="block mb-1">Features</label>
              <textarea
                name="features"
                value={editingProduct.features || ""}
                onChange={handleInputChange}
                className="w-full p-2 border rounded h-24"
              ></textarea>
            </div>
            
            <div>
              <label className="block mb-1">Current Image</label>
              {editingProduct.image && (
                <img 
                  src={`http://localhost:5500/uploads/${editingProduct.image}`} 
                  alt={editingProduct.name} 
                  className="max-w-[200px] max-h-[200px] mb-2 border rounded"
                />
              )}
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full p-2"
              />
            </div>
            
            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Update Product"}
              </button>
              <button
                type="button"
                onClick={() => setEditingProduct(null)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Products List */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b">Image</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Category</th>
              <th className="py-2 px-4 border-b">Stock</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={6} className="py-4 text-center">Loading...</td>
              </tr>
            )}
            
            {!isLoading && products.length === 0 && (
              <tr>
                <td colSpan={6} className="py-4 text-center">No products found</td>
              </tr>
            )}
            
            {!isLoading && products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">
                  <img 
                    src={product.image ? `http://localhost:5500/uploads/${product.image}` : "/placeholder.jpg"} 
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="py-2 px-4 border-b">{product.name}</td>
                <td className="py-2 px-4 border-b">${product.price.toFixed(2)}</td>
                <td className="py-2 px-4 border-b">{product.category}</td>
                <td className="py-2 px-4 border-b">{product.stock}</td>
                <td className="py-2 px-4 border-b">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingProduct(product)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded ${
                currentPage === 1 
                  ? "bg-gray-200 text-gray-500" 
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              Previous
            </button>
            
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1 
                    ? "bg-blue-700 text-white" 
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                {i + 1}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded ${
                currentPage === totalPages 
                  ? "bg-gray-200 text-gray-500" 
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 