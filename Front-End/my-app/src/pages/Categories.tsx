import HeroTab from './home/hero' ;
import { Link  } from 'react-router-dom';





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

interface Props{
  count?:number ;
  setBasketOpen : (boolean:boolean) => void ;
  isBasketOpen:boolean ;
}

export default function Categories({count , setBasketOpen ,isBasketOpen}:Props) {
  

  return (
    <>
    <HeroTab count={count} setBasketOpen={setBasketOpen} isBasketOpen={isBasketOpen}/>
      <div className="p-4 mt-[50px] flex flex-col justify-center items-center ">
        <div className="tracking-wide text-center">
          <h1 className="text-3xl font-bold text-center sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-4xl">Shop by Category</h1>
          <p className="text-lg text-gray-500 font-extralight mt-3 sm:text-xl md:text-xl lg:text-xl xl:text-xl 2xl:text-xl">
            Browse our collections and find what you're looking for
          </p>
        </div>
        <div>
          <div className="flex flex-wrap justify-center gap-[50px] mt-[100px]">
            <Link to={'/Category'} >
            <div className=" relative cursor-pointer border-2 border-gray-500 rounded-2xl hover:shadow-2xl hover:shadow-black hover:duration-150 ">
              <img
                src="Catg1.jpg"
                alt=""
                className="w-[350px] h-[300px] rounded-2xl blur-sm"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-between">
                <div>
                    <h1 className="text-white font-bold text-2xl mt-[80px]">Category 1</h1>{" "}
                    <br />
                    <p className="text-white">190 Product</p>
                </div>
                <div className="h-1/4 text-gray-500 bg-white rounded-b-2xl text-center">
                    <p className=" w-full h-full mt-3.5  ">Stylish and comfortable clothing for all occasions.</p>
                </div>
                
              </div>
            </div>
            </Link>

            <div className=" relative cursor-pointer border-2 border-gray-500 rounded-2xl hover:shadow-2xl hover:shadow-black hover:duration-150 ">
              <img
                src="Catg2.jpg"
                alt=""
                className="w-[350px] h-[300px] rounded-2xl blur-sm"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-between">
               <div>
                    <h1 className="text-white font-bold text-2xl mt-[80px]">Category 1</h1>{" "}
                    <br />
                    <p className="text-white">190 Product</p>
                </div>
                <div className="h-1/4 text-gray-500 bg-white rounded-b-2xl text-center">
                    <p className=" w-full h-full mt-3.5  ">Stylish and comfortable clothing for all occasions.</p>
                </div>
              </div>
            </div>
            <div className=" relative cursor-pointer border-2 border-gray-500 rounded-2xl hover:shadow-2xl hover:shadow-black hover:duration-150 ">
              <img
                src="Catg3.jpg"
                alt=""
                className="w-[350px] h-[300px] rounded-2xl blur-sm"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-between">
               <div>
                    <h1 className="text-white font-bold text-2xl mt-[80px]">Category 1</h1>{" "}
                    <br />
                    <p className="text-white">190 Product</p>
                </div>
                <div className="h-1/4 text-gray-500 bg-white rounded-b-2xl text-center">
                    <p className=" w-full h-full mt-3.5  ">Stylish and comfortable clothing for all occasions.</p>
                </div>
              </div>
            </div>
            <div className=" relative cursor-pointer border-2 border-gray-500 rounded-2xl hover:shadow-2xl hover:shadow-black hover:duration-150 ">
              <img
                src="Catg4.jpg"
                alt=""
                className="w-[350px] h-[300px] rounded-2xl blur-sm"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-between">
              <div>
                    <h1 className="text-white font-bold text-2xl mt-[80px]">Category 1</h1>{" "}
                    <br />
                    <p className="text-white">190 Product</p>
                </div>
                <div className="h-1/4 text-gray-500 bg-white rounded-b-2xl text-center">
                    <p className=" w-full h-full mt-3.5  ">Stylish and comfortable clothing for all occasions.</p>
                </div>
              </div>
            </div>
            <div className=" relative cursor-pointer border-2 border-gray-500 rounded-2xl hover:shadow-2xl hover:shadow-black hover:duration-150 ">
              <img
                src="Catg1.jpg"
                alt=""
                className="w-[350px] h-[300px] rounded-2xl blur-sm"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-between">
              <div>
                    <h1 className="text-white font-bold text-2xl mt-[80px]">Category 1</h1>{" "}
                    <br />
                    <p className="text-white">190 Product</p>
                </div>
                <div className="h-1/4 text-gray-500 bg-white rounded-b-2xl text-center">
                    <p className=" w-full h-full mt-3.5  ">Stylish and comfortable clothing for all occasions.</p>
                </div>
              </div>
            </div>
            <div className=" relative cursor-pointer border-2 border-gray-500 rounded-2xl hover:shadow-2xl hover:shadow-black hover:duration-150 ">
              <img
                src="Catg2.jpg"
                alt=""
                className="w-[350px] h-[300px] rounded-2xl blur-sm"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-between">
               <div>
                    <h1 className="text-white font-bold text-2xl mt-[80px]">Category 1</h1>{" "}
                    <br />
                    <p className="text-white">190 Product</p>
                </div>
                <div className="h-1/4 text-gray-500 bg-white rounded-b-2xl text-center">
                    <p className=" w-full h-full mt-3.5  ">Stylish and comfortable clothing for all occasions.</p>
                </div>
              </div>
            </div>
            <div className=" relative cursor-pointer border-2 border-gray-500 rounded-2xl hover:shadow-2xl hover:shadow-black hover:duration-150 ">
              <img
                src="Catg3.jpg"
                alt=""
                className="w-[350px] h-[300px] rounded-2xl blur-sm"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-between">
               <div>
                    <h1 className="text-white font-bold text-2xl mt-[80px]">Category 1</h1>{" "}
                    <br />
                    <p className="text-white">190 Product</p>
                </div>
                <div className="h-1/4 text-gray-500 bg-white rounded-b-2xl text-center">
                    <p className=" w-full h-full mt-3.5  ">Stylish and comfortable clothing for all occasions.</p>
                </div>
              </div>
            </div>
            <div className=" relative cursor-pointer border-2 border-gray-500 rounded-2xl hover:shadow-2xl hover:shadow-black hover:duration-150 ">
              <img
                src="Catg4.jpg"
                alt=""
                className="w-[350px] h-[300px] rounded-2xl blur-sm"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-between">
               <div>
                    <h1 className="text-white font-bold text-2xl mt-[80px]">Category 1</h1>{" "}
                    <br />
                    <p className="text-white">190 Product</p>
                </div>
                <div className="h-1/4 text-gray-500 bg-white rounded-b-2xl text-center">
                    <p className=" w-full h-full mt-3.5  ">Stylish and comfortable clothing for all occasions.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
            <br />
            <br />
            <br />
        </div>
      </div>
    </>
  );
}
