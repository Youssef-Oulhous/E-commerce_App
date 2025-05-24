import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


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

interface prop{
  setCategoryProducts:(category : string) => void ;
}
interface ProductsResponse {
  products: Product[];
}

export default function Categories ({setCategoryProducts}:prop){

  const [products,setProducts]=useState<Product[]>([]);
  const [category,setCategory]=useState<string[]>([]);

   const handleCartegories = async (category:string) =>{

    setCategoryProducts(category.replace(/\s+/g, ''))
    console.log(category.replace(/\s+/g, ''))

  }

  useEffect(()=>{
    axios.get<ProductsResponse>(`http://localhost:5500/api/products/`)
    .then((res)=>{
      setProducts(res.data.products)
      console.log(res.data.products)
    })
    .catch((err) => console.error(err));
  },[]);

   useEffect(() => {
    const categorySet = new Set(products.map((p) => p.category));
    setCategory(Array.from(categorySet).slice(0,4));
    console.log(categorySet)
    
  }, [products]);

    return(
        <>
            <div className="text-center items-center mt-[100px]">
                <h1 className="text-4xl font-semibold">Shop by Category</h1>
                <p className="text-xl text-gray-500 mt-1">Browse our collections and find what you're looking for</p>
            </div>
            <div className="flex flex-wrap justify-center gap-[50px] mt-[100px]">
              {category && category.map((cate)=>(
                 <Link to={`/Category`} >
                <div onClick={()=>handleCartegories(cate)}>
                      <div className=" relative cursor-pointer border-2 border-gray-500 rounded-2xl hover:shadow-2xl hover:shadow-black hover:duration-150 ">
                      <img src="Catg1.jpg" alt="" className="w-[350px] h-[300px] rounded-2xl blur-sm"/>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <h1 className="text-white font-bold text-2xl">{cate}</h1> <br />
                        <p className="text-white">190 Product</p>
                  </div>
                </div>
                </div>
                </Link>
                
              ))}
                
                
            </div>

            <div>
                <br />
                <br />
                <br />
            </div>
        </>
    )
}