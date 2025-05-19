import CartIcon from "../../components/CartIcon";
import { Link, useLocation } from "react-router-dom";




interface CountProps {
      count ?: number ;
      setBasketOpen : (boolean:boolean) => void ;
      isBasketOpen:boolean ;

  }


export default function HeroTab({count , setBasketOpen ,isBasketOpen} : CountProps ) {
  type nav = { name: string; path: string };
  const NavTab: nav[] = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Categories", path: "/Categories" },
    { name: "About", path: "/About" },
  ];

   

  return (
    <>
      <div className=" sticky  top-0 left-0 w-full z-60 bg-white shadow-md">
        <div className="flex justify-between items-center px-16 h-[60px] border font-roboto bg-white ">
          <div className="text-lg sm:text-1xl md:text-3xl lg:text-3xl xl:text-3xl 2xl:text-3xl font-bold font-sans   ">
            ShopNow
          </div>
          <div>
            <ul className="hidden sm:flex sm:flex-row sm:gap-2 md:gap-4  font-roboto  sm:font-medium md:font-medium  sm:text-md md:text-lg sm:cursor-pointer ">

              {NavTab.map((item) => {
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`${
                        location.pathname === item.path
                          ? "text-blue-400 font-bold"
                          : "text-black font-normal"
                      } hover:text-blue-500 transition`}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div onClick={()=> setBasketOpen(!isBasketOpen)}>
            <CartIcon itemCount={count ?? 0} />
          </div>
        </div>
      </div>
    </>
  );
}
