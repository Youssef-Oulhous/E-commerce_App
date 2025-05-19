import HeroSection from './home/hero'
import ProductPage from './home/productPage'
import Features from './home/features'
import Categories from './home/categorySection'
import NewsLetter from './home/newsletter'
import Footer from './home/footer'
import { useState } from 'react'
import BasketPanel from './BasketPanel'


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

interface FeaturesProp {
  handleAddToCart : (product : Product) => void ;
   count ?: number ;
   setBasketOpen : (boolean : boolean) => void ;
   isBasketOpen : boolean ;
   cartItem : Product[];
   handleRemoveQuantity:(id : string) => void ;

}




export default function HomePage({handleAddToCart , count ,setBasketOpen,isBasketOpen ,cartItem,handleRemoveQuantity}:FeaturesProp){

   



    return (
        <>
       <HeroSection  count={count} setBasketOpen={setBasketOpen} isBasketOpen={isBasketOpen} />
        <div className={`bg-gray-100 transition-all duration-300 ${isBasketOpen ? "blur-sm" : ""}`}>
            <div >
                
                <ProductPage />
                <Features handleAddToCart={handleAddToCart} />
                <Categories />
                <NewsLetter />
                <Footer />
            </div>
            
        </div>

        {isBasketOpen && (
                    
                    <BasketPanel cartItem={cartItem} handleRemoveQuantity={handleRemoveQuantity} setBasketOpen={setBasketOpen} isBasketOpen={isBasketOpen}  />
            )}
            
        </>
    )
}