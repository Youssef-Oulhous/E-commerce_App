import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';
import './App.css'
import HomePage from './pages/Home'
import AllProduct from './pages/AllProduct'
import SingleProduct from './pages/productDetails'
import Categories from'./pages/Categories'
import SingleCategoryPage from './pages/SingleCategoryPage'
import CartPage from './pages/CartPage'
import BasketPanel from './pages/BasketPanel';
import Login from './pages/login'
import CheckoutPage from './pages/checkoutPage';
import SingUp from './pages/register';
import { useState } from 'react';






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


function App() {
 

   const [count , setCount] = useState<number>(()=>{
    const stored = localStorage.getItem('Countcart');
    return stored ? Number(stored) : 0 ;
  }) ;
  
  const [cartItem , setCartItem] = useState<Product[]>(()=>{
    const stored = localStorage.getItem('CartItem') ;
    return stored ? JSON.parse(stored)  : [] ;
  });


  const updateCartItems = (cartItem: Product[], product: Product):Product[] => {
    
    const find = cartItem.find(item => item._id === product._id);

    if(find){

     return cartItem.map((item)=>{

        const match = product._id ;
        if(item._id === match){
          return {
            ...item ,
            quantity : item.quantity + 1
          };
        }
        return item ;
      });
    } else{
      return[...cartItem , {...product ,quantity : 1}]
    }
  }

  const updateCount = ( cartItem: Product[] , product : Product):Product[] => {
      const find = cartItem.find((item)=> item._id === product._id);

      if(find){

        return cartItem.map((item)=>{

          const match = item._id ;

          if(match === product._id){
            return {
              ...item ,
              quantity : item.quantity + 1
            };
          }
          return item ;
        });
        
      } else{
        return [...cartItem , { ...product }]
      }
  }

const handleAddToCart = (product: Product) => {
  setCartItem((prevCart) => {
    const found = prevCart.find((item) => item._id === product._id);

    let updatedCart: Product[];

    if (found) {
      updatedCart = prevCart.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...prevCart, { ...product , quantity:1 }];
      
      setCount((prev) => prev + 1);
    }

    localStorage.setItem("CartItem", JSON.stringify(updatedCart));
    return updatedCart;
  });
};




const handleRemoveQuantity = (id: string) => {
  const updatedCart = cartItem.filter((prev)=> prev._id !== id ) ;
  
  setCartItem(updatedCart);
  setCount((prev)=> prev - 1) ;

  localStorage.setItem('CartItem', JSON.stringify(updatedCart));
  localStorage.setItem('Countcart', String(updatedCart.length));

 
};


   const [ isBasketOpen , setBasketOpen ] = useState<boolean>(false);


  return(
    <>
    
    <Router>
      <Routes>
        <Route path='/' element={<HomePage  handleAddToCart={handleAddToCart} count={count}  setBasketOpen={setBasketOpen} isBasketOpen={isBasketOpen} cartItem={cartItem} handleRemoveQuantity={handleRemoveQuantity}/>} />
        <Route path='/Products' element={<AllProduct handleAddToCart={handleAddToCart} count={count} setBasketOpen={setBasketOpen} isBasketOpen={isBasketOpen} cartItem={cartItem} handleRemoveQuantity={handleRemoveQuantity} />} />
        <Route path='/Product/:id' element={<SingleProduct handleAddToCart={handleAddToCart} count={count} setBasketOpen={setBasketOpen} isBasketOpen={isBasketOpen} />} />
        <Route path='/Categories' element={<Categories count={count}  setBasketOpen={setBasketOpen} isBasketOpen={isBasketOpen} />} />
        <Route path='/Category' element={<SingleCategoryPage count={count} handleAddToCart={handleAddToCart} setBasketOpen={setBasketOpen} isBasketOpen={isBasketOpen} />}  />
        <Route path='/Cart' element={<CartPage  cartItem={cartItem} handleRemoveQuantity={handleRemoveQuantity} count={count} setBasketOpen={setBasketOpen} isBasketOpen={isBasketOpen}/>} />
        <Route path='/Basket' element={<BasketPanel  cartItem={cartItem} handleRemoveQuantity={handleRemoveQuantity} count={count} setBasketOpen={setBasketOpen} isBasketOpen={isBasketOpen} />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<SingUp />} />
        <Route path='/checkoutPage' element={<CheckoutPage />} />
      </Routes> 
    </Router>
    </>
  )
}

export default App 



// setCartItem((prev) => {
    //   const updatedCart = [...prev, product];
    //   localStorage.setItem('CartItem', JSON.stringify(updatedCart));
    //   return updatedCart ;
    // });
