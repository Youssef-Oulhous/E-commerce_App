import { FaRegTrashAlt } from "react-icons/fa";
import HeroTab from "./home/hero";
import { useState ,useEffect, useContext} from "react";
import axios , {AxiosError} from "axios";
import { jwtDecode } from "jwt-decode";
// import Checkout from "./checkoutPage";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";





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

interface UserInfo {
  userId: string;
  username: string;
}

interface CartStr {
    cartItem : Product[] ;
    handleRemoveQuantity : (id : string) => void ; 
    count ?: number ;
    setBasketOpen : (boolean:boolean) => void ;
    isBasketOpen:boolean ;
    getUserInfos:()=>void;
    
    
}

interface CheckoutResponse {
  message: string;
}

interface DecodedToken {
userId: string;
  username: string;
  iat?: number;
  exp?: number;
}



export default function CartPage ({cartItem ,handleRemoveQuantity , count , setBasketOpen ,isBasketOpen ,getUserInfos }:CartStr) {

    const [ totalPrice , setTotalPrice] = useState<number>(0);
    const [shipping , setShipping] =useState<string>('');
    const [ProductTitle , setProductTitle] = useState<string[]>([]);
    const {setUser} = useContext(UserContext);

    const navigate = useNavigate();
    

    useEffect(() => {
    const total = cartItem.reduce((acc, product) => acc + product.price, 0);
    
    if(total === 0){
        setShipping('$0')
        setTotalPrice(0)
    }else if(total > 50){
        setShipping('free')
        setTotalPrice(total)
    } else{
        setShipping('$10')
        setTotalPrice(total+10)
    }
    console.log(ProductTitle);
}, [cartItem]);

useEffect(() => {
    const fetchCheckout = async (): Promise<void> => {
      try {
        const res = await axios.get<CheckoutResponse>("http://localhost:5500/api/checkout");
        console.log(res.data.message);
      } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        console.error(err.response?.data?.message || "Not authorized");
      }
    };

    fetchCheckout();
  }, []);

  

  const AddOrder = async() =>{

        const token = localStorage.getItem('token'); 
        
        if(token){
            const decode:DecodedToken = jwtDecode<UserInfo>(token);
            const user = { userId: decode.userId, username: decode.username };
            navigate('/checkoutPage',{state: user })
           
            
        } else {
            console.log('there s no token !')
        }
       
  }



  


    return(

        <>
        <HeroTab count={count} setBasketOpen={setBasketOpen} isBasketOpen={isBasketOpen}/>
        <div className="px-[250px] py-[50px]">
            <h1 className="text-4xl font-semibold">Your Cart</h1>
            <div className="flex justify-between items">
                
                <div>

                    {cartItem.map((product)=>(
                        <div className="flex gap-[20px] mt-[70px]" key={product._id}>
                        <div><img src="Product-Image.jpg" alt="" className="w-[150px] h-[150px] rounded-xl" /></div>
                        <div className="flex justify-between gap-[300px] ">
                            <div className="flex flex-col gap-[40px]">
                                <div className="flex flex-col gap-[10px]">
                                    <h2 className="text-xl ">{product.name}</h2>
                                    <p className="text-md text-gray-500">${product.price}</p>
                                </div>
                                
                                <div className="flex gap-[30px] items-center">
                                    <div className="w-[130px] h-[40px] border rounded-lg flex justify-between items-center px-[20px] text-lg"><button>+</button><p>1</p><button className="">-</button></div>
                                    <div className="flex items-center gap-[20px] border-2 p-3 rounded-xl" onClick={()=>handleRemoveQuantity(product._id)}><FaRegTrashAlt className="text-xl"/><button >Remove</button></div>
                                </div>
                            </div>
                            <h1 className="text-2xl font-bold ">${product.price}</h1>
                           
                        </div>
                        
                    </div>
                    ))}
                    

                </div>

                <div className="p-5 border border-gray-500 rounded-xl w-[400px] h-[360px] font-extralight flex flex-col gap-3 ">
                    <div className="">
                        <h1 className="text-3xl ">Order Summary</h1>
                        <div className="flex justify-between mt-[40px] ">
                            
                        </div>
                        <div className="flex justify-between mt-3">
                            <h1 className="text-xl">Shipping</h1>
                            <p className="text-2xl">{shipping}</p>
                        </div>
                        <br />
                        <hr />
                        <br />
                        <div className="flex justify-between items-center">
                            <h1 className="text-3xl">Total</h1>
                            <p className="text-2xl">${totalPrice}</p>
                        </div>
                        
                        <div className="flex justify-center">
                            <button className="bg-zinc-900 text-white w-[250px] p-3 rounded-xl mt-5 cursor-pointer"  onClick={()=> AddOrder()}>Procecss to Checkout</button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}