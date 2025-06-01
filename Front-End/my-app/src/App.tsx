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
import Checkout from './pages/checkoutPage';
import SingUp from './pages/register';
import { useState , useContext, createContext, useEffect } from 'react';
import { UserContext } from './UserContext';
import { jwtDecode } from 'jwt-decode';



import Dashboard from './Dashboard/Dashboard';






type Product = {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  brand: string;
  rating: number;
  image:string
  _id:string;
  quantity:number;
};

interface UserInfo {
  userId: string;
  username: string;
}

type Context ={
    value: string;
    setValue: (v: string) => void;
}

export interface User {
  userId: string;
  username: string;
}

interface DecodedToken {
userId: string;
  username: string;
  iat?: number;
  exp?: number;
}


function App() {
    const [categories,setCategories] =useState<string[]>([]); 
    const [ isBasketOpen , setBasketOpen ] = useState<boolean>(false);
    const [CategoryProducts,setCategoryProducts] = useState<string>('');
    const [theUser, setUser] = useState<User | null>(null);


    const [count , setCount] = useState<number>(()=>{
    const stored = localStorage.getItem('Countcart');
    return stored ? Number(stored) : 0 ;
  });

  const [cartItem , setCartItem] = useState<Product[]>(()=>{
    const stored = localStorage.getItem('CartItem') ;
    return stored ? JSON.parse(stored)  : [] ;
  });



    const getUserInfos = async() =>{
  
          const token = localStorage.getItem('token'); 
          
          if(token){
              const decode:DecodedToken = jwtDecode<UserInfo>(token);
              const user = { userId: decode.userId, username: decode.username };
              console.log('clicked')
              setUser(user)
              
          } else {
              console.log('there s no token !')
          }

}

  


  

const handleAddToCart = (product: Product) => {
  setCartItem((prevCart) => {
    const found = prevCart.find((item) => item._id === product._id);

    console.log("count test");


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
    localStorage.setItem('Countcart',JSON.stringify(count))
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





  

  return(
    <>    
   
    <Router>
       
      <Routes>
       

            <Route path='/' element={<HomePage  handleAddToCart={handleAddToCart} count={count}  setBasketOpen={setBasketOpen} isBasketOpen={isBasketOpen} cartItem={cartItem} handleRemoveQuantity={handleRemoveQuantity} setCategoryProducts={setCategoryProducts}/>} />
            <Route path='/Products' element={<AllProduct setCategories={setCategories} categories={categories} handleAddToCart={handleAddToCart} count={count} setBasketOpen={setBasketOpen} isBasketOpen={isBasketOpen} cartItem={cartItem} handleRemoveQuantity={handleRemoveQuantity} />} />
            <Route path='/Product/:id' element={<SingleProduct handleAddToCart={handleAddToCart} count={count} setBasketOpen={setBasketOpen} isBasketOpen={isBasketOpen} />} />
            <Route path='/Categories' element={<Categories setCategoryProducts={setCategoryProducts} setCategories={setCategories} categories={categories} count={count} setBasketOpen={setBasketOpen} isBasketOpen={isBasketOpen}/>} />
            <Route path='/Category' element={<SingleCategoryPage count={count} handleAddToCart={handleAddToCart} setBasketOpen={setBasketOpen} isBasketOpen={isBasketOpen} CategoryProducts={CategoryProducts} />}  />
            <Route path='/Cart' element={<CartPage  cartItem={cartItem} handleRemoveQuantity={handleRemoveQuantity} count={count} setBasketOpen={setBasketOpen} isBasketOpen={isBasketOpen} getUserInfos={getUserInfos}   />} />
            <Route path='/Basket' element={<BasketPanel  cartItem={cartItem} handleRemoveQuantity={handleRemoveQuantity} count={count} setBasketOpen={setBasketOpen} isBasketOpen={isBasketOpen} />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<SingUp />} />
            <Route path='/checkoutPage' element={<Checkout cartItem={cartItem} />} />

            <Route path='/dashboard/' element={<Dashboard />} />

      </Routes> 
      
    </Router>
  
    </>
  )
}

export default App 