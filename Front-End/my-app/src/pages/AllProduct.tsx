import { CiSearch } from "react-icons/ci";
import { CiFilter } from "react-icons/ci";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import StarRating from "../components/RatingStars";
import HeroTab from "./home/hero";
import axios from "axios";
import BasketPanel from "./BasketPanel";

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

interface ProductsResponse {
  products: Product[];
  totalPages: number;
}

interface Search {
  products: Product[];
}

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
  //the state saving

  const [product, setproducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const limit = 6;
  const [rate, setRate] = useState<"asc" | "des">("asc");
  const [display, setDisplay] = useState<"none" | "block">("none");
  const [priceOrder, setPriceOrder] = useState<'asc' | 'desc'>('desc');

  // the fetching part

  useEffect(() => {
    const trimmed = search.trim();

    if (!trimmed) {
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
      axios
        .get<ProductsResponse>(
          `http://localhost:5500/api/products/search?query=${encodeURIComponent(
            trimmed
          )}`
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

  useEffect(() => {
    const categorySet = new Set(product.map((p) => p.category));
    setCategories(Array.from(categorySet));
    console.log(categories);
  }, [product]);

  const FilterByRating = () => {
    setRate((prev) => {
      const newRate = prev === "asc" ? "des" : "asc";
      console.log("good reso");

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

  

      const handlePriceFilter = () => {
  const nextOrder = priceOrder === 'asc' ? 'desc' : 'asc';

  axios
    .get<ProductsResponse>(`http://localhost:5500/api/products/price?order=${nextOrder}&page=${currentPage}&limit=${limit}`)
    .then(res => {
      setproducts(res.data.products);
      setPriceOrder(nextOrder);
    })
    .catch(err => console.error(err));
};

  const switchDp = () => {
    setDisplay((prev) => (prev === "none" ? "block" : "none"));
  };

  return (
    <>
      <HeroTab
        count={count}
        setBasketOpen={setBasketOpen}
        isBasketOpen={isBasketOpen}
      />

      <div
        className={`bg-gray-100 transition-all duration-300 ${
          isBasketOpen ? "blur-sm" : ""
        }`}
      >
        <div className="p-4">
          <div className="flex flex-col gap-[15px] sm:flex-row md:flex-row lg:flex-row xl:flex-row 2xl:flex-row justify-between items-center px-5 sm:px-10 md:px-10 lg:px-10  xl:px-10  2xl:px-10  py-10 ">
            <div className=" flex flex-col">
              <h1 className="text-3xl font-bold">All Products</h1>
              <p className="text-md font-light text-gray-500">
                Browse our collection of high-quality products
              </p>
            </div>

            <div className="flex flex-row gap-4 justify-center items-center mt-[10px]">
              <div className="relative ">
                <CiSearch className="w-[25px] h-[25px] absolute left-3 top-[9px] " />

                <input
                  type="text"
                  placeholder="Search product"
                  className="w-[250px] h-[45px] px-[40px] border border-gray-300 rounded-md font-medium text-md focus:border focus:border-gray-600  "
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="flex flex-col items-center">
                <div className="relative inline-block">
                  {/* Filter Button */}
                  <button
                    className="border border-gray-300 rounded-md h-[43px] w-[40px]"
                    onClick={switchDp}
                  >
                    <CiFilter className="w-[30px] h-[30px] mx-auto" />
                  </button>

                  {/* Dropdown (Positioned Below and Centered) */}
                  <div
                    style={{ display: display }} // "block" or "none"
                    className="absolute left-1/2 -translate-x-1/2 mt-2 z-10 w-[150px]"
                  >
                    <div className="flex flex-col bg-gray-200 p-2 gap-2 rounded-lg items-center">
                      <button className={`${rate === 'des' ? 'bg-gray-700 text-white w-[100px] rounded-md p-1' : 'w-[100px] rounded-md p-1 hover:bg-gray-300 transition duration-150'}`} onClick={FilterByRating} >
                        Rating
                      </button>
                      
                        <button className={`${priceOrder === 'asc' ? 'bg-gray-700 text-white w-[100px] rounded-md p-1' : 'w-[100px] rounded-md p-1 hover:bg-gray-300 transition duration-150'}`}  onClick={handlePriceFilter}>
                          Price
                        </button>                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="px-5">
            <div className="flex flex-row flex-wrap justify-center items-center gap-[30px]">
              {Array.isArray(product) && product.length > 0 ? (
                product.map((product) => (
                  <div
                    key={product._id}
                    className="w-[300px] sm:w-[350px] md:w-[350px] lg:w-[350px] xl:w-[350px] 2xl:w-[350px] border-2 rounded-3xl mt-[100px]"
                  >
                    <div>
                      <img
                        src="Product-Image.jpg"
                        alt={product.name}
                        className="w-[300px] sm:w-[350px] md:w-[350px] lg:w-[350px] xl:w-[350px] 2xl:w-[350px] h-[300px] sm:h-[350px] md:h-[350px] lg:h-[350px] xl:h-[350px] 2xl:h-[300px] rounded-t-2xl"
                      />
                    </div>
                    <div className="p-4 flex flex-col gap-[15px]">
                      <h2 className="text-gray-500 text-md">
                        {" "}
                        {product.category}
                      </h2>
                      <h1 className="text-xl font-bold">
                        <Link
                          to={`/product/${product._id}`}
                          className="hover:underline"
                        >
                          {product.name}
                        </Link>
                      </h1>
                      <StarRating rating={product.rating} />
                      <p className="text-lg font-semibold sm:text-xl">
                        ${product.price}
                      </p>
                      <button
                        className="flex items-center justify-center gap-2 w-full bg-black text-white py-2 rounded-md hover:bg-neutral-900 transition"
                        onClick={() => handleAddToCart(product)}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7a1 1 0 001.85.9L8.25 15M7 13h.01M21 21a1 1 0 11-2 0 1 1 0 012 0zM7 21a1 1 0 11-2 0 1 1 0 012 0z"
                          />
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

            <div className="flex flex-row justify-center items-center gap-3 mt-[30px]">
              <button
                className="w-[40px] h-[40px] px-[10px] border-gray-400 rounded-md border"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                {" "}
                <FaArrowLeft className="w-[15px] h-[15px] text-gray-600 " />{" "}
              </button>
              <button className="text-lg border border-gray-400 w-[30px] h-[30px] rounded-md text-white bg-black">
                {currentPage}
              </button>

              <button
                className="w-[40px] h-[40px] px-[10px] border-gray-400 rounded-md border"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                {" "}
                <FaArrowRight className="w-[15px] h-[15px] text-gray-600  " />{" "}
              </button>
            </div>
          </div>

          <div>
            <br />
            <br />
            <br />
            <br />
          </div>
        </div>
      </div>

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
