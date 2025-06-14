// src/pages/CartPage.tsx (or wherever this file is located)

import { FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { UserContext } from "../UserContext"; // Assuming this context exists
import { BsCart3 } from "react-icons/bs";
import axios from "axios";
import StarRating from "@/components/RatingStars";
import { MdVerified } from "react-icons/md";
import {BadgeX} from 'lucide-react' ;


import HeroTab from "./home/hero";

// shadcn/ui imports - NOTE: We don't need AlertDialogTrigger for a controlled dialog
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../src/components/ui/alert-dialog";

// --- TYPE DEFINITIONS ---

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  brand: string;
  rating: number;
  quantity: number;
};

interface CartStr {
  cartItem: Product[];
  handleRemoveQuantity: (id: string) => void;
  count?: number;
  setBasketOpen: (open: boolean) => void;
  isBasketOpen: boolean;
  getUserInfos: () => void; // Prop is passed but not used in this component, which is fine
}

interface DecodedToken {
  userId: string;
  username: string;
  iat?: number;
  exp?: number;
}

interface Add {
  products : Product[],
  orderNumber : string ;

}

// --- MAIN CART PAGE COMPONENT ---

export default function CartPage({
  cartItem,
  handleRemoveQuantity,
  count,
  setBasketOpen,
  isBasketOpen,
}: CartStr) {
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [shipping, setShipping] = useState<string>("$0");
  const [currentStep , SetCurrentStep] = useState<number>(1);


  // ✨ ADDED: State to manage the delete confirmation dialog
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  // ✨ FIXED: Corrected the logic for calculating shipping and total
  useEffect(() => {
    const subtotal = cartItem.reduce((acc, p) => acc + p.price * p.quantity, 0);
    const rounded = parseFloat(subtotal.toFixed(2));
    

    if (rounded === 0) {
      setShipping("$0");
      setTotalPrice(0);
    } else if (rounded > 50) {
      setShipping("Free");
      setTotalPrice(rounded);
    } else {
      setShipping("$10");
      setTotalPrice(rounded + 10);
    }
  }, [cartItem]);

  const [Message ,SetMessage] = useState<string>('');
  const [successDispaly , SetSuccessDispaly] = useState<string>('none');
  const [failedDisaply , SetSFailedDispaly] = useState<string>('none');


  const token = localStorage.getItem('token');
  const products = cartItem.map(item => ({
    productId: item._id,
    quantity: item.quantity,
  }));

  useEffect(()=>{
    SetCurrentStep(1)
  },[])

const [cartItems, setCartItems] = useState<Product[]>([]);
const [cartCount, setCartCount] = useState<number>(0);

// On component mount or update:
useEffect(() => {
  const items = JSON.parse(localStorage.getItem('CartItem') || '[]');
  const count = parseInt(localStorage.getItem('Countcart') || '0');
  setCartItems(items);
  setCartCount(count);
}, []);
  


  const createOrder = async () => {
  try {
    const res = await axios.post<Add>(
      'http://localhost:5500/api/orders/',
      { products },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    
    const data = res.data.orderNumber;
    SetMessage(`The purchase went successfully! Your Order Number: ${data}`);
    SetSuccessDispaly('block');

    localStorage.removeItem('Countcart');
    localStorage.removeItem('CartItem');

    setCartItems([]);
    setCartCount(0);
    
  } catch (err: any) {
    
    console.error(err);
    SetMessage("Oops, there was a problem while submitting the order.");
    SetSFailedDispaly('block');
  }
  
};






  // ✨ ADDED: Handler for when the user confirms deletion in the dialog
  const handleDeleteConfirm = () => {
    if (itemToDelete) {
      handleRemoveQuantity(itemToDelete);
      setItemToDelete(null); // Close the dialog
    }
  };

  return (
    <>
      <HeroTab
        count={count}
        setBasketOpen={setBasketOpen}
        isBasketOpen={isBasketOpen}
      />
      <div className="px-4 py-10 sm:px-6 md:px-10 lg:px-20 flex flex-col gap-10 max-w-screen-xl mx-auto">
        <div className="flex flex-col items-center gap-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold">
            Your Shopping Cart
          </h1>
          <div className="flex flex-wrap justify-center gap-8">
            <StepIndicator step={1} label="Shopping Cart" active={currentStep === 1} />
            <StepIndicator step={2} label="Checkout Details" active={currentStep === 2} />
            <StepIndicator step={3} label="Order Complete" active={currentStep === 3} />
          </div>
        </div>
        {currentStep === 1 && (
<div className="flex flex-col lg:flex-row gap-8 w-full">
          {/* Cart items */}
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
            <div className="space-y-6">
              {cartItem.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-2xl p-4 flex flex-col md:flex-row gap-4 shadow"
                >
                  <img
                    src={"/Catg1.jpg"} // Use a leading slash for public assets
                    alt={product.name}
                    className="w-full md:w-48 h-48 object-cover rounded-lg"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-medium">{product.name}</h3>
                        <p className="text-sm text-gray-500">
                          <StarRating  rating={product.rating} />
                        </p>
                      </div>
                      {/* ✨ UPDATED: Button now sets state to open the dialog */}
                      <button
                        onClick={() => setItemToDelete(product._id)}
                        className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-50 transition"
                        aria-label={`Remove ${product.name}`}
                      >
                        <FaTrashAlt size={22} />
                      </button>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <p className="text-lg font-semibold">
                        ${(product.price * product.quantity).toFixed(2)}
                      </p>
                      <div className="w-full max-w-[140px] h-12 bg-gray-100 rounded-lg flex items-center justify-between px-3">
                        <button className="text-2xl hover:bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center transition" onClick={()=>product.quantity - 1} >-</button>
                        <span className="text-lg font-medium">{product.quantity}</span>
                        <button className="text-xl hover:bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center transition" onClick={()=>product.quantity + 1}>+</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-96">
            <div className="bg-white border rounded-2xl p-6 space-y-6 shadow">
              <h2 className="text-2xl font-semibold">Order Summary</h2>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  className="flex-1 h-12 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-800"
                />
                <button className="h-12 px-6 bg-zinc-800 text-white rounded-lg hover:bg-black transition">
                  Apply
                </button>
              </div>
              <div className="space-y-3 text-lg">
                <SummaryLine
                  label="Subtotal"
                  value={`$${(totalPrice - (shipping === "Free" ? 0 : shipping === "$0" ? 0 : 10)).toFixed(2)}`}
                />
                <SummaryLine label="Delivery Fee" value={shipping} />
                <hr />
                <SummaryLine
                  label="Total"
                  value={`$${totalPrice.toFixed(2)}`}
                  bold
                />
              </div>
              <button
                className="w-full h-14 bg-zinc-800 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-black transition"
                onClick={()=>SetCurrentStep(2)}
                disabled={cartItem.length === 0} // Disable button if cart is empty
              >
                Go to Checkout
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  className="stroke-current"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        )}

        {currentStep === 2 && (
          <div className="max-w-6xl mx-auto p-4 md:p-8">
      {/* Page Title */}
      <h1 className="text-2xl md:text-3xl font-bold mb-8 text-center">
        Checkout Details
      </h1>

      {/* Layout: Shipping + Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Section: Shipping and Payment */}
        <div className="lg:col-span-2 space-y-10">
          {/* Shipping Info */}
          <div className="bg-white shadow-md rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="input"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="input"
                />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                className="input w-full"
              />
              <input
                type="text"
                placeholder="Street Address"
                className="input w-full"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="City" className="input" />
                <input type="text" placeholder="Postal Code" className="input" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Country" className="input" />
                <input type="text" placeholder="Phone Number" className="input" />
              </div>
            </form>
          </div>

          {/* Payment Method */}
          <div className="bg-white shadow-md rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
            <div className="space-y-4">
              <label className="flex items-center gap-3">
                <input type="radio" name="payment" className="accent-blue-600" />
                <span>Credit/Debit Card</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="radio" name="payment" className="accent-blue-600" />
                <span>PayPal</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="radio" name="payment" className="accent-blue-600" />
                <span>Cash on Delivery</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Section: Order Summary */}
        <div className="bg-white shadow-md rounded-2xl p-6 h-fit">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          {cartItem.map((product)=>(
            <div className="space-y-4 border-b pb-4">
            {/* Product Item */}
            <div className="flex justify-between">
              <span>{product.name}</span>
              <span>${product.price}</span>
            </div>
            
          </div>
          ))}
          

          {/* Price Summary */}
          <div className="mt-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span>{`$${(totalPrice - (shipping === "Free" ? 0 : shipping === "$0" ? 0 : 10)).toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span>{shipping}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>{`$${totalPrice.toFixed(2)}`}</span>
            </div>
          </div>

          {/* Continue Button */}
          <button className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition" onClick={()=>{createOrder(), SetCurrentStep(3)}}>
            Continue to Payment
          </button>
        </div>
      </div>
    </div>
        )}

        {currentStep === 3 && (
          <div>
            <div style={{display:successDispaly}}>
              <div className="flex flex-col justify-center items-center gap-4" >
                <MdVerified color="green" size={70}  />
                <h1 className="text-xl md:text-2xl lg:text-2xl xl:text-3xl 2xl:text-3xl">{Message}</h1>
                <Link to={`/`}>
                  <button className="w-[180px] border-4 border-black rounded-xl bg-gray-100 text-xl md:text-xl lg:text-xl xl:text-xl 2xl:text-xl hover:bg-black hover:text-white delay-75 duration-200 p-2 ">Go back to the Home Page</button>
                </Link>
                
              </div>
            </div>
            
            <div style={{display:failedDisaply}}>
              <div className="flex flex-col justify-center items-center gap-4" >
                <BadgeX color="red" size={70}  />
                <h1 className="text-xl md:text-2xl lg:text-2xl xl:text-3xl 2xl:text-3xl">{Message}</h1>
                <Link to={`/`}>
                  <button className="w-[180px] border-4 border-black rounded-xl bg-gray-100 text-xl md:text-xl lg:text-xl xl:text-xl 2xl:text-xl hover:bg-black hover:text-white delay-75 duration-200 p-2 ">Go back to the Home Page</button>
                </Link>
                
            </div>
            </div>
            
          </div>
        ) }
        




      </div>

      {/* ✨ ADDED: The controlled AlertDialog for confirming deletion */}
      <AlertDialog
        open={!!itemToDelete}
        onOpenChange={(isOpen) => !isOpen && setItemToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete the product ?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will permanently remove this item from your shopping
              cart.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} color="red">
                Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}



// 🔹 Reusable Step Indicator
function StepIndicator({
  step,
  label,
  active = false,
}: {
  step: number;
  label: string;
  active?: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      {/* ✨ FIXED: className syntax was broken */}
      <div
        className={`w-8 h-8 flex items-center justify-center rounded-full text-white ${
          active ? "bg-zinc-800" : "bg-zinc-400"
        }`}
      >
        {step}
      </div>
      <span
        className={`text-lg font-light ${
          active ? "text-black" : "text-zinc-400"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

// 🔹 Reusable Quantity Adjuster
function QuantityAdjuster({
  product,
  onChange,
}: {
  product: Product;
  onChange: (newQty: number) => void;
}) {
  return (
    <div className="w-full max-w-[140px] h-12 bg-gray-100 rounded-lg flex items-center justify-between px-3">
      <button className="text-2xl hover:bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center transition" >-</button>
      <span className="text-lg font-medium">{product.quantity}</span>
      <button className="text-xl hover:bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center transition">+</button>
    </div>
  );
}

// 🔹 Reusable Summary Line
function SummaryLine({
  label,
  value,
  bold = false,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-500">{label}</span>
      <span className={bold ? "text-black font-bold" : "text-black"}>
        {value}
      </span>
    </div>
  );
}