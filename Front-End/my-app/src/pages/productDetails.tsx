import StarRating from "../components/RatingStars";
import { useState ,useEffect } from "react";
import HeroTab from './home/hero' ;
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";


type Product = {
  name: string;
  description: string;
  features:string;
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
  setBasketOpen : (boolean:boolean) => void ;
  isBasketOpen:boolean ;
}

export default function SingleProduct({handleAddToCart , count , setBasketOpen , isBasketOpen} :Props) {
  type Tab = "description" | "features" | "Brand";
  const [ActiveTab, setActiveTab] = useState<Tab>("description");
  const {id} = useParams<{id : string}>()
  const [Product , setProduct] = useState<Product | null>(null);
  console.log(id)
  
      useEffect(()=>{
        if(!id)return ;
          axios.get<Product>(`http://localhost:5500/api/products/${id}`)
          .then((res)=>setProduct(res.data))
          .catch((err)=> console.error(err))
      },[id])

      if(!Product) return <p>loading...</p> 


  return (
    <>
    <HeroTab count={count}  setBasketOpen={setBasketOpen} isBasketOpen={isBasketOpen}/>
      <div className="p-5 w-screen">
        <div className="px-25 py-10 flex justify-centre gap-[50px] ">
          <div className="flex flex-col gap-3 w-1/2">
            <div className="flex gap-2  items-center">
              <a href="#" className="text-gray-400 text-lg">
                <Link to={'/'}>Home</Link>
                
              </a>{" "}
              <p>&gt;</p>
              <a href="#" className="text-gray-400 text-lg">
               <Link to={'/Products'}>Products</Link> 
              </a>{" "}
              <p>&gt;</p>
              <a href="#" className="text-lg">
                {Product.name}
              </a>
            </div>
            <div className="flex flex-col gap-3 w-1/2">
              <div>
                <img
                  src="Product-Image.jpg"
                  alt=""
                  className="w-[800px] h-[800px] rounded-xl border "
                />
              </div>
              <div className="flex gap-3 ">
                <img
                  src="Product-Image.jpg"
                  alt=""
                  className="w-[200px] h-[190px] rounded-lg cursor-pointer"
                />
                <img
                  src="Product-Image.jpg"
                  alt=""
                  className="w-[200px] h-[190px] rounded-lg cursor-pointer"
                />
                <img
                  src="Product-Image.jpg"
                  alt=""
                  className="w-[200px] h-[190px] rounded-lg cursor-pointer"
                />
                <img
                  src="Product-Image.jpg"
                  alt=""
                  className="w-[200px] h-[190px] rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="mt-[100px] w-1/2">
            <h1 className="text-5xl font-bold"></h1>
            <div className="flex ">
              <StarRating rating={4.5} />{" "}
              <p className="text-gray-500">{Product.rating}  (124 reviews)</p>
            </div>
            <h3 className="text-3xl font-semibold mt-[30px]">${Product.price}</h3>
            <p className="text-md text-gray-400 font-extralight ">
              Free shipping on orders over $50
            </p>
            <p className="text-xl text-gray-500 font-light mt-[30px]">
              {Product.description}
            </p>
            <div className="flex gap-[30px] mt-[40px]">
              <button className="w-[50px] border-2 border-gray-200 rounded-md text-2xl">
                +
              </button>
              <p className="text-2xl">1</p>
              <button className="w-[50px] border-2 border-gray-200 rounded-md text-2xl items-center">
                -
              </button>
            </div>
            <div className="flex gap-10 justify-center items-center mt-10">
              <button className="flex items-center justify-center gap-2 w-1/2 bg-black text-white py-2 rounded-md hover:bg-neutral-900 transition" onClick={()=>handleAddToCart(Product)}>
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
              <button className="flex items-center justify-center gap-2 w-1/2 text-black py-2 border-2 rounded-md hover:bg-neutral-900 hover:text-white transition">
                Buy Now
              </button>
            </div>
            <div className="flex flex-col mt-[30px] gap-5">
              <div className="w-[800px] h-[60px] bg-gray-200 text-lg flex justify-center gap-[100px] items-center rounded-xl py-2">
                <button onClick={() => setActiveTab("description")} className={`${ActiveTab === "description" ? "bg-white w-[170px] h-[40px] rounded-xl": "bg-gray-200 text-gray-600"}`}>
                  Description
                </button>
                <button
                  onClick={() => setActiveTab("features")}
                  className={`${ActiveTab === 'features' ? "bg-white w-[170px] h-[40px] rounded-xl" : "bg-gray-200 text-gray-600"}`}
                >
                  Features
                </button>
                <button onClick={() => setActiveTab("Brand")} className={`${ActiveTab === 'Brand' ? "bg-white w-[170px] h-[40px] rounded-xl" : "bg-gray-200 text-gray-600"}`}>
                  Brand
                </button>
              </div>
              <div>
                {ActiveTab === "description" && (
                  <div className="text-lg">
                    <p>
                      {Product.description}
                    </p>
                  </div>
                )}

                {ActiveTab === "features" && (
                  <div className="ml-0">
                    <ul className="list-disc ml-4">
                     {Product.features}
                    </ul>
                  </div>
                )}

                {ActiveTab === "Brand" && (
                  <div>
                    {Product.brand}
                  </div>
                )}
              </div>

              <div>
                <div></div>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
}
