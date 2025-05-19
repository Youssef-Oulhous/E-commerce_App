import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";



type Product = {
  _id:string
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  brand: string;
  rating: number;
  quantity:number;
};


interface FeaturesProp {
  handleAddToCart : (product : Product) => void ;
}

interface ProductsResponse {
  products: Product[];
  totalPages: number;
}

export default function Features({handleAddToCart} : FeaturesProp) {
  const [products, setProducts] = useState<Product[]>([]);

  // const [currentPage ,setCurrentPage] = useState<number>(1);
  // const [totalPages, setTotalPages] = useState<number>(1);
  // const limit = 4; 

  useEffect(() => {
    axios
      .get<ProductsResponse>(`http://localhost:5500/api/products/`)
      .then((res) =>{
        console.log(res.data)
         setProducts(res.data.products.slice(0,4));


      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <div className="bg-white font-geist flex justify-center items-center w-screen">
        <div className=" mt-[150px]">
          <h1 className="text-2xl sm:text-4xl md:text-4xl lg:text-4xl xl:text-4xl 2xl:text-4xl font-bold text-center  ">
            Featured Products
          </h1>
          <p className="text-md sm:text-xl md:text-xl xl:text-xl 2xl:text-xl text-center text-gray-500 ">
            Discover our most popular items handpicked for you
          </p>

          <div className="flex flex-wrap justify-center items-center sm:flex-row gap-[30px]">
            {products.map((product) => {
              return (
                <div className="">
                  <div className="w-[300px] sm:w-[350px] md:w-[350px] lg:w-[350px] xl:w-[350px] 2xl:w-[350px] border-2 rounded-3xl mt-[100px]">
                    <div>
                      <img
                        src="Product-Image.jpg"
                        alt=""
                        className="w-[300px] sm:w-[350px] md:w-[350px] lg:w-[350px] xl:w-[350px] 2xl:w-[350px] h-[300px] sm:h-[350px] md:h-[350px]  lg:h-[350px] xl:h-[350px] 2xl:h-[350px] rounded-t-2xl"
                      />
                    </div>
                    <div className="p-4 flex flex-col gap-[15px]">
                      <h2 className="text-gray-500 text-md">
                        {product.category}
                      </h2>
                      <h1 className="text-xl font-bold">
                        <a href="#" className="hover:underline">
                         <Link to={`/product/${product._id}`}>{product.name}</Link> 
                        </a>
                      </h1>
                      <p className="text-lg font-semibold sm:text-xl md:text-xl lg:text-xl xl:text-xl 2xl:text-xl ">
                        ${product.price}
                      </p>
                      {/* <Link to={`/Cart/${product._id}`}> */}
                        <button className="flex items-center justify-center gap-2 w-full bg-black text-white py-2 rounded-md hover:bg-neutral-900 transition" onClick={()=>handleAddToCart(product)}>
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
                      {/* </Link> */}
                      
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* //////// */}

          <div className="flex justify-center items-center mt-[50px] ">
            <div className="text-lg w-[240px] p-4 border-2 flex justify-center rounded-xl hover:bg-gray-300 hover:duration-100 cursor-pointer mb-2">
              <Link to="/Products">
                <button>View All Product</button>
              </Link>
            </div>
          </div>

          <br />
          <br />
        </div>
      </div>
    </>
  );
}
