/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import Image from 'next/image';
import Link from 'next/link';
import { ContinueAndViewCartButtonLeftRight } from '../buttons/commonButton';

const CartDropdown = ({ cart, toggleHidden, continueShoppingClick, viewCartClick, HideMiniCart }) => (
  <div className='w-full h-full fixed left-0 top-10'>
    <div className='bg-gray-700 w-full h-full opacity-40' onClick={toggleHidden}></div>
    <div className="absolute w-full sm:w-96 md:w-96 cart-dropdown-h-450 top-0 my-0 sm:mx-1 sm:right-0 bg-white z-50">
      <div className='h-10 mt-1 border-t border-b border-solid pl-2 text-sm text-black'>
        <div className='font-bold text-left mt-2 w-2/3 float-left'>
          {cart?.totalQuantity} Items, {cart?.totalProducts} products, {cart?.total.toFixed(2)} $
        </div>
        <button className='float-right w-8 h-8 text-red-600 text-lg' onClick={HideMiniCart}>X</button>
      </div>
      <div className="cart-drop-down-list-height text-sm mt-2 overflow-y-auto">
        {(cart && cart?.products && cart?.products.length) ? (
          cart.products.map(item => <ProductItem key={item.id} product = {item} />)
        ) : (
          <div className="text-lg h-96 text-center"> Your cart is empty </div>
        )}
      </div>
      <div className='h-12'>
        <ContinueAndViewCartButtonLeftRight continueHandleClick={continueShoppingClick} viewCarthandleClick={viewCartClick}/>
      </div>
    </div>
  </div>
);

export function ProductItem({product}){
  return(
    <div className='flex mb-2 border-b border-gray-300 border-solid'>
      <div className='w-12 h-12 mr-2 cursor-pointer'>
        <Link href={'/products/' + product.id}>
          <Image src={product.thumbnail} alt={product.title} width={45} height={45}/>
        </Link>
      </div>
      
      <div className='w-full'>
        <div className='float-left w-56'>
          <Link href={'/products/' + product.id} className='text-black font-normal'>
            {product.title}
          </Link>          
        </div>
        <div className='w-20 float-right text-right mr-1'>
          <div className='text-gray-500 px-0.5 py-0.5 font-bold'>{product.quantity}</div>
          <div className='text-gray-500 px-0.5 py-0.5 font-bold'>{product.price} $</div>
        </div>
      </div>
    </div>
  );
}


export default CartDropdown;
