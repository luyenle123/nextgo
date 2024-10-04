/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import cartIcon from '@/app/images/cart.png';
import searchIcon from '@/app/images/search-icon-100-2.png';

import { useState } from 'react'
import { GetCartDetail, AddToCart, Fetcher, GetCartDetailUrl } from "@/app/services/cartAPI";
import * as constants from '@/app/constants'
import { Loader } from "@/app/components/loader/loader";
import { IResponseServiceModel } from "@/app/models/responseModel";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { toast } from 'react-toastify';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import useSWR from 'swr';

const CartDropdown = dynamic(() => import('./minicart'), { loading: () => <></>})

const UpdateCartInfo = async(res, qty) => {
  
  if(!res)
  {
    res = await GetCartDetail(5);
  }
  if(res.isSuccess)
  {
    const element = document.getElementById('cart-item-number');
    if(element){
      if(!qty){qty = 0;}
      let currentQty = parseInt(element.innerText);
      if(!currentQty){ currentQty = 0; }
      if(currentQty === 0) { currentQty = res.data.totalQuantity; }
      element.innerHTML = currentQty + qty;
      //console.log('Updatae cart info :' + res.data.totalQuantity);
    }
  }

  return res;
}

const Cart = () => {
  const [showMiniCart, setShowMiniCart] = useState(false);
  const route = useRouter();

  const url = GetCartDetailUrl(4);   
  const { data, error, isLoading } = useSWR(url, Fetcher(), {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    });
  
  const cart = data;

  if(error){
    console.log(error);
  }

  const handleCartClick = async (e) => {
     if(showMiniCart)
     {
      setShowMiniCart(false);
     }
     else{
      setShowMiniCart(true);
     }
  };
  
  const HideMiniCart = () =>{
    setShowMiniCart(false);
  }

  const handleContinueClick = () =>{
    route.push('/' + constants.NAV_PRODUCT_LIST);
    setShowMiniCart(false);
  }
  
  const handleViewCartClick = () =>{
    route.push('/' + constants.NAV_CART_DETAIL);
    setShowMiniCart(false);
  }  

  return (
    <>
    {isLoading && showMiniCart && <Loader isActive={true}/>}
      <div className='fixed h-10 top-0 w-40 left-full -mx-40 text-white'>
        <div className='h-10 float-right flex'>
            <Link href={'/search'} className='block md:hidden mt-1 opacity-40 mr-2 float-left'>
              <Image src={searchIcon} width={30} height={30} alt='search'></Image>
            </Link>

            <div className='float-left'>
              <Image className='w-10 cursor-pointer float-left' src={cartIcon} alt='cart' onClick={handleCartClick} width={36} height={36}/>
            </div>
            <div id='cart-item-number' className='text-xs font-thin h-4 mt-0.5 mr-2 px-1 -ml-3 border rounded-lg border-gray-400 float-right'>
              {cart?cart.totalQuantity:'00'}
            </div>
        </div>

        {showMiniCart && <CartDropdown cart={cart} toggleHidden = { HideMiniCart} continueShoppingClick = {handleContinueClick} viewCartClick={handleViewCartClick} HideMiniCart = {HideMiniCart}/>}
      </div>
    </>
  )
}

const DoAddToCart = async (product, updateStatus) => {

  if(parseInt(product.stock) <= 0){
    updateStatus(false);
    toast.warning('Not allow add the product ' + product.sku + ' to cart.');
    return;
  }

  const res = await AddToCart(product.id, 1) as IResponseServiceModel;
  if(res.isSuccess){
    //toast("Add '" + productCode + "' to cart successful.");
  }
  else{
    toast.error('Error: ' + res.data);
  }

  updateStatus(true);
}

export { Cart, UpdateCartInfo, DoAddToCart }
