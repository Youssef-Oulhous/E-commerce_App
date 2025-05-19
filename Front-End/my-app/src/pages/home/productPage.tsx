import { Link } from "react-router-dom";

export default function ProductPage() {
  return (
    <>
      <div className=" w-screen mx-auto px-4 overflow-x-hidden">
        <div className="flex flex-col justify-center sm:flex-row sm:justify-center sm:items-center sm:gap-4 md:gap-8 lg:gap-12 xl:gap-16 2xl:gap-20 p-3 mt-[100px] bg-gray-100 font-inter">
          <div className="flex flex-col gap-6 sm:text-center md:text-left">
            <div className="leading-normal">
              <h1 className="text-5xl sm:text-5xl md:text-7xl lg:text-7xl xl:text-7xl 2xl:text-7xl font-extrabold font-inter">
                Discover Our Latest <br /> Collection
              </h1>
              <p className="text-xl font-inter font-medium text-gray-500">
                Shop the latest trends and find your perfect style. Free
                shipping <br /> on orders over $50.
              </p>
            </div>

            <div className="flex flex-col  sm:flex-col md:flex-row items-start gap-[20px] ">
              <button className="w-[150px] h-[50px] font-inter p-1 text-lg font-medium rounded-lg bg-black text-white duration-75 hover:bg-neutral-900">
               <Link to={'/Products'}>shop now</Link> 
              </button>
              <button className="w-[250px] h-[50px]  font-inter p-1 text-lg font-medium rounded-lg bg-white text-black duration-75 hover:bg-gray-100 hover:border border-black">
                <Link to="/Categories">Explore Categories</Link>
              </button>
            </div>
          </div>

          <div className="mt-8 sm:mt-0 sm:ml-4">
            <img
              src="public/Product-Image.jpg"
              alt=""
              className="w-[500px] sm:w-[600px] h-auto rounded-3xl"
            />
          </div>
        </div>

            <div className=" mb-[100px]">
                <br />
            </div>
      </div>
    </>
  );
}
