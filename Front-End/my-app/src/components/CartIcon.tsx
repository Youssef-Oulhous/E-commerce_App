import { ShoppingCartIcon } from '@heroicons/react/24/outline';

interface CartIconProps {
  itemCount: number;
}

const CartIcon:React.FC<CartIconProps> = ({itemCount}: CartIconProps) => {

    return(
        <div className='relative cursor-pointer'>
            <ShoppingCartIcon className='w-8 h-8 text-gray-700' />
            {itemCount > 0 && (
                <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold  px-1.5 py-0.5 rounded-full'>
                    {itemCount}
                </span>
            )}
        </div>
    )
};


export default CartIcon ;





