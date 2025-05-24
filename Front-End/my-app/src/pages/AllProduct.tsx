// Importing necessary icons from react-icons
import { CiSearch } from "react-icons/ci";
import { CiFilter } from "react-icons/ci";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";

// Importing React hooks and router functionality
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Importing custom components
import StarRating from "../components/RatingStars";
import HeroTab from "./home/hero";
import axios from "axios";
import BasketPanel from "./BasketPanel";

// Defining Product type
type Product = {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  brand: string;
  rating: number;
  image: string;
  _id: string;
  quantity: number;
};

// Defining component props interface
interface Props {
  handleAddToCart: (product: Product) => void;
  count?: number;
  setBasketOpen: (boolean: boolean) => void;
  isBasketOpen: boolean;
  cartItem: Product[];
  handleRemoveQuantity: (id: string) => void;
  setCategories: React.Dispatch<React.SetStateAction<string[]>>;
  categories: string[];
}

// Response interfaces
interface ProductsResponse {
  products: Product[];
  totalPages: number;
}

interface Search {
  products: Product[];
}

// Component starts here
export default function AllProduct({
  handleAddToCart,
  count,
  setBasketOpen,
  isBasketOpen,
  cartItem,
  handleRemoveQuantity,
  setCategories,
  categories,
}: Props) {

  // State declarations
  const [product, setproducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const limit = 6;
  const [rate, setRate] = useState<"asc" | "des">("asc");
  const [display, setDisplay] = useState<"none" | "block">("none");
  const [priceOrder, setPriceOrder] = useState<'asc' | 'desc'>('desc');

  // Fetch all or searched products when page or search changes
  useEffect(() => {
    const trimmed = search.trim();

    if (!trimmed) {
      // Fetch paginated product list
      axios
        .get<ProductsResponse>(
          `http://localhost:5500/api/products?page=${currentPage}&limit=${limit}`
        )
        .then((res) => {
          setproducts(res.data.products);
          setTotalPages(res.data.totalPages);
        })
        .catch((err) => console.error(err));
    } else {
      // Fetch search results
      axios
        .get<ProductsResponse>(
          `http://localhost:5500/api/products/search?query=${encodeURIComponent(trimmed)}`
        )
        .then((res) => {
          if (Array.isArray(res.data)) {
            setproducts(res.data);
          } else if (res.data.products) {
            setproducts(res.data.products);
          } else {
            setproducts([]);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [currentPage, search]);

  // Extract unique categories from fetched products
  useEffect(() => {
    const categorySet = new Set(product.map((p) => p.category));
    setCategories(Array.from(categorySet));
    console.log(categories);
  }, [product]);

  // Toggle sorting by rating
  const FilterByRating = () => {
    setRate((prev) => {
      const newRate = prev === "asc" ? "des" : "asc";

      axios
        .get<ProductsResponse>(
          `http://localhost:5500/api/products/rating?order=${newRate}&page=${currentPage}&limit=${limit}`
        )
        .then((res) => {
          if (Array.isArray(res.data)) {
            setproducts(res.data);
          } else if (Array.isArray(res.data.products)) {
            setproducts(res.data.products);
          }
        })
        .catch((err) => console.error(err));

      return newRate;
    });
  };

  // Toggle sorting by price
  const handlePriceFilter = () => {
    const nextOrder = priceOrder === 'asc' ? 'desc' : 'asc';

    axios
      .get<ProductsResponse>(
        `http://localhost:5500/api/products/price?order=${nextOrder}&page=${currentPage}&limit=${limit}`
      )
      .then(res => {
        setproducts(res.data.products);
        setPriceOrder(nextOrder);
      })
      .catch(err => console.error(err));
  };

  // Toggle filter dropdown visibility
  const switchDp = () => {
    setDisplay((prev) => (prev === "none" ? "block" : "none"));
  };

  return (
    <>
      {/* Header section with hero tab */}
      <HeroTab
        count={count}
        setBasketOpen={setBasketOpen}
        isBasketOpen={isBasketOpen}
      />

      {/* Main product container */}
      <div className={`bg-gray-100 transition-all duration-300 ${isBasketOpen ? "blur-sm" : ""}`}>
        <div className="p-4">
          {/* Header and filters */}
          <div className="flex flex-col sm:flex-row justify-between items-center px-5 py-10">
            {/* Title */}
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold">All Products</h1>
              <p className="text-md font-light text-gray-500">Browse our collection of high-quality products</p>
            </div>

            {/* Search and filter section */}
            <div className="flex flex-row gap-4 justify-center items-center mt-[10px]">
              {/* Search bar */}
              <div className="relative">
                <CiSearch className="w-[25px] h-[25px] absolute left-3 top-[9px]" />
                <input
                  type="text"
                  placeholder="Search product"
                  className="w-[250px] h-[45px] px-[40px] border border-gray-300 rounded-md"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              {/* Filter dropdown */}
              <div className="flex flex-col items-center">
                <div className="relative inline-block">
                  <button
                    className="border border-gray-300 rounded-md h-[43px] w-[40px]"
                    onClick={switchDp}
                  >
                    <CiFilter className="w-[30px] h-[30px] mx-auto" />
                  </button>

                  {/* Dropdown content */}
                  <div style={{ display: display }} className="absolute left-1/2 -translate-x-1/2 mt-2 z-10 w-[150px]">
                    <div className="flex flex-col bg-gray-200 p-2 gap-2 rounded-lg items-center">
                      <button className={`${rate === 'des' ? 'bg-gray-700 text-white' : 'hover:bg-gray-300'} w-[100px] rounded-md p-1`} onClick={FilterByRating}>
                        Rating
                      </button>
                      <button className={`${priceOrder === 'asc' ? 'bg-gray-700 text-white' : 'hover:bg-gray-300'} w-[100px] rounded-md p-1`} onClick={handlePriceFilter}>
                        Price
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product list */}
          <div className="px-5">
            <div className="flex flex-row flex-wrap justify-center items-center gap-[30px]">
              {Array.isArray(product) && product.length > 0 ? (
                product.map((product) => (
                  <div key={product._id} className="w-[300px] border-2 rounded-3xl mt-[100px]">
                    <div>
                      {/* Product image */}
                      <img
                        src="Product-Image.jpg"
                        alt={product.name}
                        className="w-full h-[300px] rounded-t-2xl"
                      />
                    </div>
                    <div className="p-4 flex flex-col gap-[15px]">
                      {/* Product details */}
                      <h2 className="text-gray-500 text-md">{product.category}</h2>
                      <h1 className="text-xl font-bold">
                        <Link to={`/product/${product._id}`} className="hover:underline">
                          {product.name}
                        </Link>
                      </h1>
                      <StarRating rating={product.rating} />
                      <p className="text-lg font-semibold">${product.price}</p>

                      {/* Add to cart button */}
                      <button
                        className="flex items-center justify-center gap-2 w-full bg-black text-white py-2 rounded-md hover:bg-neutral-900 transition"
                        onClick={() => handleAddToCart(product)}
                      >
                        {/* Cart icon */}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7a1 1 0 001.85.9L8.25 15M7 13h.01M21 21a1 1 0 11-2 0 1 1 0 012 0zM7 21a1 1 0 11-2 0 1 1 0 012 0z" />
                        </svg>
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p>Nothing found.</p>
              )}
            </div>

            {/* Pagination controls */}
            <div className="flex flex-row justify-center items-center gap-3 mt-[30px]">
              <button
                className="w-[40px] h-[40px] px-[10px] border-gray-400 rounded-md border"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <FaArrowLeft className="w-[15px] h-[15px] text-gray-600" />
              </button>
              <button className="text-lg border border-gray-400 w-[30px] h-[30px] rounded-md text-white bg-black">
                {currentPage}
              </button>
              <button
                className="w-[40px] h-[40px] px-[10px] border-gray-400 rounded-md border"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                <FaArrowRight className="w-[15px] h-[15px] text-gray-600" />
              </button>
            </div>
          </div>

          {/* Bottom spacing */}
          <div>
            <br /><br /><br /><br />
          </div>
        </div>
      </div>

      {/* Basket panel displayed if basket is open */}
      {isBasketOpen && (
        <BasketPanel
          cartItem={cartItem}
          handleRemoveQuantity={handleRemoveQuantity}
          setBasketOpen={setBasketOpen}
          isBasketOpen={isBasketOpen}
        />
      )}
    </>
  );
}
