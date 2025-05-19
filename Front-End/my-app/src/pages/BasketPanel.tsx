import HeroTab from "./home/hero";
import { Link } from "react-router-dom";

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  brand: string;
  rating: number;
  image?: string;
    quantity:number;
};



interface CartStr {
    cartItem : Product[] ;
    handleRemoveQuantity : (id : string) => void ; 
    count ?: number ;
    setBasketOpen : (boolean:boolean) => void ;
    isBasketOpen:boolean ;

    
}

export default function BasketPanel ({cartItem ,setBasketOpen ,isBasketOpen,count,handleRemoveQuantity}:CartStr) {

    return(
        
        <div className="fixed top-0 right-0 w-[450px] max-w-full h-full bg-white shadow-lg z-50 overflow-y-auto ">
        
  <div className="flex flex-col gap-6 p-6 mt-[80px]">
    {cartItem.map((item) => (
      <div key={item._id} className="flex gap-4 items-center border-b pb-4">
        <img
          src={'Product-Image.jpg'}
          alt={item.name}
          className="w-20 h-20 object-cover rounded-md"
        />
        <div className="flex flex-col justify-between w-full">
          <h2 className="text-lg font-semibold">{item.name}</h2>
          <p className="text-gray-600">${item.price}</p>
          <p className="text-gray-600">quatity : {item.quantity}</p>
          <div className="flex gap-[10px]">
            <Link to={'/login'}>
            <button className="mt-2 self-start bg-black text-white px-4 py-1 rounded hover:bg-gray-800 transition">
                Checkout
            </button></Link>
            
            <button className="mt-2 self-start bg-white text-black border px-4 py-1 rounded hover:bg-black hover:text-white transition" onClick={()=> handleRemoveQuantity(item._id)}>
                Remove
            </button>
          </div>
          
        </div>
      </div>
    ))}
  </div>

  
</div>

    )

}