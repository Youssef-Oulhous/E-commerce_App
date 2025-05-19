import { CiSearch } from "react-icons/ci";
import { CiFilter } from "react-icons/ci";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

import HeroTab from './home/hero' ;


// i need to fetch the categories ; 

type Product = {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  brand: string;
  rating: number;
  image:string
  _id:string;
  quantity:number;
};

interface Props{
  handleAddToCart : (product : Product) => void ;
  count ?: number ;
  setBasketOpen : (boolean : boolean) => void ; 
  isBasketOpen:boolean ;
}




export default function SingleCategoryPage({count ,handleAddToCart ,setBasketOpen ,isBasketOpen}:Props) {




  return (
    <>
    <HeroTab count={count} setBasketOpen={setBasketOpen} isBasketOpen={isBasketOpen}/>
      <div className="py-15 w-screen px-[40px] sm:px-[100px] md:px-[120px] lg:px-[120px] xl:px-[120px] 2xl:px-[120px]">
        <div className="flex gap-2  items-center">
          <Link to={'/'}>
          <a href="#" className="text-gray-400 text-md hover:underline">
            Home
          </a></Link>
          {" "}
          <p>&gt;</p>
          <Link to={'/Categories'}>
          <a href="#" className="text-gray-400 text-md hover:underline ">
            Categories
          </a></Link>
          {" "}
          <p>&gt;</p>
          <h1 className="text-lg font-semibold">Clothing</h1>
        </div>
        <div className="flex flex-col sm:flex-col md:flex-row xl:flex-row  2xl:flex-row  justify-between items-center mt-[50px]">
          <div>
            <h1 className="text-4xl font-bold">Category</h1>
            <p className="text-lg text-gray-500 mt-4">
              Stylish and comfortable clothing for all occasions.
            </p>
          </div>
          <div>
            <div className="flex flex-row gap-4 justify-center items-center mt-[10px]">
              <div className="relative ">
                <CiSearch className="w-[25px] h-[25px] absolute left-3 top-[9px] " />
                <input
                  type="text"
                  placeholder="Search product"
                  className="w-[250px] h-[45px] px-[40px] border border-gray-300 rounded-md font-medium text-md focus:border focus:border-gray-600  "
                />
              </div>
              <div>
                <button className="border border-gray-300 rounded-md h-[43px] w-[40px] items-center ">
                  <CiFilter className="w-[30px] h-[30px] ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-wrap justify-center gap-[30px]">
            <div className="w-[300px] sm:w-[350px] md:w-[350px] lg:w-[350px] xl:w-[350px] 2xl:w-[350px] border-2 rounded-3xl mt-[100px]">
              <div>
                <img
                  src="Product-Image.jpg"
                  alt=""
                  className="w-[300px] sm:w-[350px] md:w-[350px] lg:w-[350px] xl:w-[350px] 2xl:w-[350px] h-[300px] sm:h-[350px] md:h-[350px]  lg:h-[350px] xl:h-[350px] 2xl:h-[300px] rounded-t-2xl"
                />
              </div>
              <div className="p-4 flex flex-col gap-[15px]">
                <h2 className="text-gray-500 text-md">Category</h2>
                <h1 className="text-xl font-bold">
                  <a href="#" className="hover:underline">
                    HeadPhones
                  </a>
                </h1>
                <p className="text-lg font-semibold sm:text-xl md:text-xl lg:text-xl xl:text-xl 2xl:text-xl ">
                  $119.99
                </p>
                <button className="flex items-center justify-center gap-2 w-full bg-black text-white py-2 rounded-md hover:bg-neutral-900 transition"  >
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
            <div className="w-[300px] sm:w-[350px] md:w-[350px] lg:w-[350px] xl:w-[350px] 2xl:w-[350px] border-2 rounded-3xl mt-[100px]">
              <div>
                <img
                  src="Product-Image.jpg"
                  alt=""
                  className="w-[300px] sm:w-[350px] md:w-[350px] lg:w-[350px] xl:w-[350px] 2xl:w-[350px] h-[300px] sm:h-[350px] md:h-[350px]  lg:h-[350px] xl:h-[350px] 2xl:h-[300px] rounded-t-2xl"
                />
              </div>
              <div className="p-4 flex flex-col gap-[15px]">
                <h2 className="text-gray-500 text-md">Category</h2>
                <h1 className="text-xl font-bold">
                  <a href="#" className="hover:underline">
                    HeadPhones
                  </a>
                </h1>
                <p className="text-lg font-semibold sm:text-xl md:text-xl lg:text-xl xl:text-xl 2xl:text-xl ">
                  $119.99
                </p>
                <button className="flex items-center justify-center gap-2 w-full bg-black text-white py-2 rounded-md hover:bg-neutral-900 transition">
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
            <div className="w-[300px] sm:w-[350px] md:w-[350px] lg:w-[350px] xl:w-[350px] 2xl:w-[350px] border-2 rounded-3xl mt-[100px]">
              <div>
                <img
                  src="Product-Image.jpg"
                  alt=""
                  className="w-[300px] sm:w-[350px] md:w-[350px] lg:w-[350px] xl:w-[350px] 2xl:w-[350px] h-[300px] sm:h-[350px] md:h-[350px]  lg:h-[350px] xl:h-[350px] 2xl:h-[300px] rounded-t-2xl"
                />
              </div>
              <div className="p-4 flex flex-col gap-[15px]">
                <h2 className="text-gray-500 text-md">Category</h2>
                <h1 className="text-xl font-bold">
                  <a href="#" className="hover:underline">
                    HeadPhones
                  </a>
                </h1>
                <p className="text-lg font-semibold sm:text-xl md:text-xl lg:text-xl xl:text-xl 2xl:text-xl ">
                  $119.99
                </p>
                <button className="flex items-center justify-center gap-2 w-full bg-black text-white py-2 rounded-md hover:bg-neutral-900 transition">
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
            <div className="w-[300px] sm:w-[350px] md:w-[350px] lg:w-[350px] xl:w-[350px] 2xl:w-[350px] border-2 rounded-3xl mt-[100px]">
              <div>
                <img
                  src="Product-Image.jpg"
                  alt=""
                  className="w-[300px] sm:w-[350px] md:w-[350px] lg:w-[350px] xl:w-[350px] 2xl:w-[350px] h-[300px] sm:h-[350px] md:h-[350px]  lg:h-[350px] xl:h-[350px] 2xl:h-[300px] rounded-t-2xl"
                />
              </div>
              <div className="p-4 flex flex-col gap-[15px]">
                <h2 className="text-gray-500 text-md">Category</h2>
                <h1 className="text-xl font-bold">
                  <a href="#" className="hover:underline">
                    HeadPhones
                  </a>
                </h1>
                <p className="text-lg font-semibold sm:text-xl md:text-xl lg:text-xl xl:text-xl 2xl:text-xl ">
                  $119.99
                </p>
                <button className="flex items-center justify-center gap-2 w-full bg-black text-white py-2 rounded-md hover:bg-neutral-900 transition">
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
            <div className="w-[300px] sm:w-[350px] md:w-[350px] lg:w-[350px] xl:w-[350px] 2xl:w-[350px] border-2 rounded-3xl mt-[100px]">
              <div>
                <img
                  src="Product-Image.jpg"
                  alt=""
                  className="w-[300px] sm:w-[350px] md:w-[350px] lg:w-[350px] xl:w-[350px] 2xl:w-[350px] h-[300px] sm:h-[350px] md:h-[350px]  lg:h-[350px] xl:h-[350px] 2xl:h-[300px] rounded-t-2xl"
                />
              </div>
              <div className="p-4 flex flex-col gap-[15px]">
                <h2 className="text-gray-500 text-md">Category</h2>
                <h1 className="text-xl font-bold">
                  <a href="#" className="hover:underline">
                    HeadPhones
                  </a>
                </h1>
                <p className="text-lg font-semibold sm:text-xl md:text-xl lg:text-xl xl:text-xl 2xl:text-xl ">
                  $119.99
                </p>
                <button className="flex items-center justify-center gap-2 w-full bg-black text-white py-2 rounded-md hover:bg-neutral-900 transition">
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
            <div className="w-[300px] sm:w-[350px] md:w-[350px] lg:w-[350px] xl:w-[350px] 2xl:w-[350px] border-2 rounded-3xl mt-[100px]">
              <div>
                <img
                  src="Product-Image.jpg"
                  alt=""
                  className="w-[300px] sm:w-[350px] md:w-[350px] lg:w-[350px] xl:w-[350px] 2xl:w-[350px] h-[300px] sm:h-[350px] md:h-[350px]  lg:h-[350px] xl:h-[350px] 2xl:h-[300px] rounded-t-2xl"
                />
              </div>
              <div className="p-4 flex flex-col gap-[15px]">
                <h2 className="text-gray-500 text-md">Category</h2>
                <h1 className="text-xl font-bold">
                  <a href="#" className="hover:underline">
                    HeadPhones
                  </a>
                </h1>
                <p className="text-lg font-semibold sm:text-xl md:text-xl lg:text-xl xl:text-xl 2xl:text-xl ">
                  $119.99
                </p>
                <button className="flex items-center justify-center gap-2 w-full bg-black text-white py-2 rounded-md hover:bg-neutral-900 transition">
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
            <div className="w-[300px] sm:w-[350px] md:w-[350px] lg:w-[350px] xl:w-[350px] 2xl:w-[350px] border-2 rounded-3xl mt-[100px]">
              <div>
                <img
                  src="Product-Image.jpg"
                  alt=""
                  className="w-[300px] sm:w-[350px] md:w-[350px] lg:w-[350px] xl:w-[350px] 2xl:w-[350px] h-[300px] sm:h-[350px] md:h-[350px]  lg:h-[350px] xl:h-[350px] 2xl:h-[300px] rounded-t-2xl"
                />
              </div>
              <div className="p-4 flex flex-col gap-[15px]">
                <h2 className="text-gray-500 text-md">Category</h2>
                <h1 className="text-xl font-bold">
                  <a href="#" className="hover:underline">
                    HeadPhones
                  </a>
                </h1>
                <p className="text-lg font-semibold sm:text-xl md:text-xl lg:text-xl xl:text-xl 2xl:text-xl ">
                  $119.99
                </p>
                <button className="flex items-center justify-center gap-2 w-full bg-black text-white py-2 rounded-md hover:bg-neutral-900 transition">
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
            <div className="w-[300px] sm:w-[350px] md:w-[350px] lg:w-[350px] xl:w-[350px] 2xl:w-[350px] border-2 rounded-3xl mt-[100px]">
              <div>
                <img
                  src="Product-Image.jpg"
                  alt=""
                  className="w-[300px] sm:w-[350px] md:w-[350px] lg:w-[350px] xl:w-[350px] 2xl:w-[350px] h-[300px] sm:h-[350px] md:h-[350px]  lg:h-[350px] xl:h-[350px] 2xl:h-[300px] rounded-t-2xl"
                />
              </div>
              <div className="p-4 flex flex-col gap-[15px]">
                <h2 className="text-gray-500 text-md">Category</h2>
                <h1 className="text-xl font-bold">
                  <a href="#" className="hover:underline">
                    HeadPhones
                  </a>
                </h1>
                <p className="text-lg font-semibold sm:text-xl md:text-xl lg:text-xl xl:text-xl 2xl:text-xl ">
                  $119.99
                </p>
                <button className="flex items-center justify-center gap-2 w-full bg-black text-white py-2 rounded-md hover:bg-neutral-900 transition">
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
          </div>
          <div>
            <div className="flex flex-row justify-center items-center gap-3 mt-[30px]">
              <button className="w-[40px] h-[40px] px-[10px] border-gray-400 rounded-md border">
                {" "}
                <FaArrowLeft className="w-[15px] h-[15px] text-gray-600 " />{" "}
              </button>
              <button className="text-lg border border-gray-400 w-[30px] h-[30px] rounded-md text-white bg-black">
                1
              </button>
              <button className="text-lg border border-gray-400 w-[30px] h-[30px] rounded-md">
                2
              </button>
              <button className="text-lg border border-gray-400 w-[30px] h-[30px] rounded-md">
                3
              </button>
              <button className="w-[40px] h-[40px] px-[10px] border-gray-400 rounded-md border">
                {" "}
                <FaArrowRight className="w-[15px] h-[15px] text-gray-600  " />{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
