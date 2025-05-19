


export default function NewsLetter () {


    return(
        <>
            <div className="mt-[100px] bg-white">
                <br />
                <h1 className="text-2xl sm:text-4xl md:text-4xl lg:text-4xl xl:text-4xl 2xl:text-4xl font-bold text-center mt-[100px]">Stay Updated</h1>
                <p className="text-md sm:text-xl md:text-xl xl:text-xl 2xl:text-xl text-center text-gray-500">Subscribe to our newsletter for exclusive offers and the latest <br /> updates</p>
                <div className="flex justify-center  gap-[5px] sm:gap-[30px] md:gap-[30px] lg:gap-[30px] xl:gap-[30px] 2xl:gap-[30px] mt-[30px]">
                    <input type="text" placeholder="Enter Your Email" className="w-[200px] sm:w-[300px] md:w-[300px] lg:w-[300px] xl:w-[300px] 2xl:w-[300px] py-4 px-4 border border-gray-500 rounded-xl" />
                    <button className="bg-zinc-900 hover:bg-black w-[100px] text-white rounded-xl p-3 text-md">Subscribe</button>
                </div>
                <p className="text-sm text-center text-gray-500 mt-2">By subscribing, you agree to our Terms of Service and Privacy Policy.</p>
                <br />
                <br />
                <br />
                <br />
                <hr />
                <br />

            </div>
        </>
    )
}