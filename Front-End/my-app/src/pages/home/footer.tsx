


export default function Footer () {

    return(
        <>
            <div className="bg-white flex sm:flex-row md:flex-row  lg:flex-row  xl:flex-row  2xl:flex-row  flex-col justify-center sm:justify-between md:justify-between lg:justify-between xl:justify-between 2xl:justify-between items-center px-[100px]">
                <div>
                    <h1 className="text-xl font-black text-center">ShopNow</h1>
                    <p className="text-gray-500 text-sm text-center ">
                        © 2025 ShopNow. All rights reserved.
                    </p> 
                </div>
                <div>
                    <ul className="flex flex-row gap-[70px] cursor-pointer text-xs text-center text-gray-500 mt-[10px]" >
                        <li>
                            Privacy
                        </li>
                        <li>
                            Terms of Service
                        </li>
                        <li>
                            Contact Us
                        </li>
                    </ul>
                </div>

                
                
            </div>
            <div className="bg-white">
                <br />
                
            </div>
        </>
    )
}