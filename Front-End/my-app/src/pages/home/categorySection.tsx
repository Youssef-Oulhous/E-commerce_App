



export default function Categories (){


    return(
        <>
            <div className="text-center items-center mt-[100px]">
                <h1 className="text-4xl font-semibold">Shop by Category</h1>
                <p className="text-xl text-gray-500 mt-1">Browse our collections and find what you're looking for</p>
            </div>
            <div className="flex flex-wrap justify-center gap-[50px] mt-[100px]">
                <div className=" relative cursor-pointer border-2 border-gray-500 rounded-2xl hover:shadow-2xl hover:shadow-black hover:duration-150 ">
                      <img src="Catg1.jpg" alt="" className="w-[350px] h-[300px] rounded-2xl blur-sm"/>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <h1 className="text-white font-bold text-2xl">Category 1</h1> <br />
                        <p className="text-white">190 Product</p>
                      </div>
                      
                </div>
                <div className=" relative cursor-pointer border-2 border-gray-500 rounded-2xl hover:shadow-2xl hover:shadow-black hover:duration-150 ">
                      <img src="Catg2.jpg" alt="" className="w-[350px] h-[300px] rounded-2xl blur-sm"/>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <h1 className="text-white font-bold text-2xl">Category 2</h1> <br />
                        <p className="text-white">190 Product</p>
                      </div>
                      
                </div>
                <div className=" relative cursor-pointer border-2 border-gray-500 rounded-2xl hover:shadow-2xl hover:shadow-black hover:duration-150 ">
                      <img src="Catg3.jpg" alt="" className="w-[350px] h-[300px] rounded-2xl blur-sm"/>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <h1 className="text-white font-bold text-2xl">Category 3</h1> <br />
                        <p className="text-white">190 Product</p>
                      </div>
                      
                </div>
                <div className=" relative cursor-pointer border-2 border-gray-500 rounded-2xl hover:shadow-2xl hover:shadow-black hover:duration-150 ">
                      <img src="Catg4.jpg" alt="" className="w-[350px] h-[300px] rounded-2xl blur-sm"/>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <h1 className="text-white font-bold text-2xl">Category 4</h1> <br />
                        <p className="text-white">190 Product</p>
                      </div>
                      
                </div>
            </div>

            <div>
                <br />
                <br />
                <br />
            </div>
        </>
    )
}