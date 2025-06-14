import { useEffect , useState } from "react";
import axios, { AxiosError } from "axios";
import { useLocation } from 'react-router-dom';
import { GrValidate } from "react-icons/gr";
import { VscError } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
interface CheckoutResponse {
  message: string;
}
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
   cartItem : Product[] ;


}

interface CreatedOrderResponse {
  _id: string;
  user: string;
  products: {
    productId: string;
    quantity: number;
    // Optional: populated product info if backend populates
  }[];
  totalAmount: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
}
interface OrderProductInput {
  productId: string; // MongoDB ObjectId as string
  quantity: number;
}

export interface CreateOrderRequest {
  products: OrderProductInput[];
  status?: 'pending' | 'completed' | 'cancelled'; // optional, defaults to 'pending'
  user : UserInfo ;
}

interface UserInfo {
  userId: string;
  username: string;
}

interface Add {
  products : Product[],
  orderNumber : string ;
}


export default function Checkout({ cartItem  }:Props) {

  const [Message , setMessage] = useState<string>('')
  const [SuccessDisplay , setSuccessDisplay] = useState<string>('block');
  const [FailedDispaly,setFailedDispaly] = useState<string>('none')
  const navigate = useNavigate();

   const products = cartItem.map(item => ({
    productId: item._id,
    quantity: item.quantity,
  }));

  const token = localStorage.getItem('token');

  const location = useLocation();
  const userInfos = location.state as {
   userId : string;
   username : string;
   
  };

 useEffect(() => {
  const createOrder = async () => {
    try {
      const res = await axios.post<Add>('http://localhost:5500/api/orders/', {
        products
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res)=>{
        const data  = res.data.orderNumber ;
        setMessage(`the Purchas went successfully ! Your Order Number : ${data}`);
        setSuccessDisplay('block')

        // setTimeout(()=>{
        //   navigate('/')
        // },4000)

      }).catch((err)=>{
        setMessage('there s a problem on the checkout step !')
        setFailedDispaly('none')
        
      })
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  createOrder();
}, []);

  

  
  

return(
  <>
  <div className=" ">

      <div className="flex justify-center items-center py-25 text-xl " style={{display :SuccessDisplay }}>
            <div className="flex justify-center items-center flex-col gap-6">
                  <div>
                    <GrValidate size={80} color="green" />
                  </div>
                  <div className="flex flex-col items-center gap-2">
                  <h1 className="text-5xl font-semibold">
                    Thank you for your purchase
                  </h1>
                  <p className="text-green-500">
                    {Message}
                  </p>
                  <p className="text-xl text-gray-900">
                    We've received you order will ship in 5-7 days .
                  </p>
                  </div>
              </div> 

          </div>

          <div className="flex justify-center items-center py-25 text-xl " style={{display:FailedDispaly}}>
            <div className="flex justify-center items-center flex-col gap-6">
                  <div>
                    <VscError size={80} color="red" />
                  </div>
                  <div className="flex flex-col items-center gap-2">
                  <h1 className="text-5xl font-semibold">
                    Error on the purchase 
                  </h1>
                  <p className="text-xl text-gray-900">
                    Oops!Network Error 
                  </p>
                  <p className="text-red-500">
                    {Message}
                  </p>
                  </div>
              </div> 
          </div>


        </div>
          

  </>
)



// style={{color:Color}}
}
