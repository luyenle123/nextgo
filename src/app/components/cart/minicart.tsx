/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import Image from 'next/image';
import Link from 'next/link';
import { ContinueAndViewCartButtonLeftRight } from '../buttons/commonButton';
import { Fetcher, GetCartDetailUrl } from '@/app/services/cartAPI';
import useSWR from 'swr';
import { useRouter } from 'next/navigation';
import { NAV_CART_DETAIL, NAV_PRODUCT_LIST } from '@/app/constants';

export function CartDropdown(props){
  const route = useRouter();
  const url = GetCartDetailUrl(4);   
  const { data, error, isLoading } = useSWR(url, Fetcher(), {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    });

  // const data = null;
  // const isLoading = true;
  // const error = null;    
    
  let cart = data;
  let products = cart?.products?.slice(0,3);
  const emptyCart = {
    products: [{},{},{}],
    total:0.0,
    discountedTotal:0.0,
    totalProducts:0,
    totalQuantity:0,
    isEmpty:true
  };

  if(isLoading){
    cart = emptyCart;
    products = emptyCart.products;
  }

  if(error){
    console.log(error);
  }
  
  const handleContinueClick = () =>{
    route.push('/' + NAV_PRODUCT_LIST);
    if(props.HideMiniCart)
      {
        props.HideMiniCart();
      }
  }
  
  const handleViewCartClick = () =>{
    route.push('/' + NAV_CART_DETAIL);
    if(props.HideMiniCart)
    {
      props.HideMiniCart();
    }
  }

  const emptycl = cart?.isEmpty ? ' blur-sm123' : '';
  return(
    <>
      <div className='w-full h-full fixed left-0 top-10 text-black'>
        <div className='bg-gray-700 w-full h-full opacity-40' onClick={props.HideMiniCart}></div>

        <div className='absolute w-full sm:w-96 md:w-96 cart-dropdown-h-450 top-0 my-0 sm:mx-1 sm:right-0 bg-white z-50'>
          <div className={'h-10 mt-1 border-b border-solid pl-2 text-sm' + emptycl}>
            <div className='font-bold text-center mt-2 w-full float-left'>
              Showing {products?.length} / {cart?.totalProducts} products
            </div>
            <button className='float-right w-8 h-8 text-red-600 text-lg relative -mt-7' onClick={props.HideMiniCart}>X</button>
          </div>
          <div className={'cart-drop-down-list-height text-sm mt-2 overflow-y-auto' + emptycl}>
            {(cart && products && products.length) ? (
              products.map((item, i) => <ProductItem key={i} product = {item} isEmpty={cart.isEmpty}/>)
            ) : (
              <div className="text-lg h-96 text-center"> Your cart is empty </div>
            )}
          </div>
          <div className='font-bold text-right w-full pr-1 text-xl'>
            Total: {cart?.total.toFixed(2)} $
          </div>          
          <div className={'mt-4' + emptycl}>
            <ContinueAndViewCartButtonLeftRight continueHandleClick={handleContinueClick} viewCarthandleClick={handleViewCartClick}/>
          </div>
        </div>
      </div>    
    </>
  );

}

export function ProductItem(props){
  const itemTotal = props.isEmpty ? 0 : props.product.price * props.product.quantity;
  return(
    <div className='flex mb-2 pb-2 border-b border-gray-300 border-solid'>
      <div className='w-20 h-20 cursor-pointer'>
        <Link href={'/products/' + props.product.id}>
          {props.isEmpty ? 
          <>
            <div className='w-20 h-20 bg-gray-300 ml-1 rounded-md'></div>
          </> : 
          <>
            <Image src={props.product.thumbnail} alt={props.product.title} width={80} height={80} className='max-w-none'/>
          </>}
        </Link>
      </div>
      
      <div className='w-full pl-2'>
        <div className='float-left-1 w-56'>
          <Link href={'/products/' + props.product.id} className='font-bold'>
            {props.isEmpty ? 'Selfie Lamp with iPhone' : props.product.title}
          </Link>
          <div className='text-sm'>
            {props.product.title}
          </div>
        </div>
        <div className='w-32 float-right text-right mr-1'>
          <div className='text-gray-500 px-0.5 py-0 w-10 border text-center float-right'>{props.isEmpty ? '0' : props.product.quantity}</div>          
          <div className='text-gray-500 px-0.5 py-0.5 font-bold float-right'>{props.isEmpty ? '00' : props.product.price} $ / {props.isEmpty ? '00' : itemTotal.toFixed(2)} $</div>
        </div>
      </div>
    </div>
  );
}


export default CartDropdown;
