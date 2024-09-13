/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import cartIcon from '@/app/images/cart.png';

import { useEffect, useState } from 'react'
import { GetCartDetail, AddToCart } from "@/app/services/cartService";
import * as constants from '@/app/constants'
import { LoaderToggle } from "@/app/components/loader/loader";
import { IResponseServiceModel } from "@/app/models/responseModel";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { ICartModel } from '@/app/models/cartModel';
import ProductRating from '../products/productRating';
import { ContinueAndViewCartButtonCenter, ContinueAndViewCartButtonLeftRight, ContinueShoppingButton, ViewCartButton } from '../buttons/commonButton';

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
  const [cart, setCart] = useState<ICartModel | undefined>(undefined);
  const route = useRouter();

  //console.log('Cart Info');

  let res = null;
  const doGetCartDetail = async() => {
    res = await GetCartDetail(5);
    if(res.isSuccess)
    {
      setCart(res.data);
    }
  }

  const handleCartClick = async (e) => {
     if(showMiniCart)
     {
      setShowMiniCart(false);
     }
     else{
      LoaderToggle(true);
      const res = await GetCartDetail(5) as IResponseServiceModel;
      if(res.isSuccess)
      {
        setCart(res.data);
      }
      else{
        setCart(undefined);
      }
      setShowMiniCart(true);
      LoaderToggle(false);
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

  useEffect(() => {
    doGetCartDetail();
  }, []);
  
  if(!cart){
    return(<></>);
  }

  return (
    <>
      <div className='fixed top-0 left-full -ml-16 text-white'>
          <Image className='w-10 float-left cursor-pointer' src={cartIcon} alt='cart' onClick={handleCartClick} width={40} height={40}/>
          <div id='cart-item-number' className='font-normal text-xs my-0.5 mx-8 py-px px-1 absolute border rounded-lg min-w-5 h-5'>{cart.totalQuantity}</div>

        {showMiniCart && <CartDropdown cart={cart} toggleHidden = { HideMiniCart} continueShoppingClick = {handleContinueClick} viewCartClick={handleViewCartClick} HideMiniCart = {HideMiniCart}/>}
      </div>    
    </>
  )
}

const CartDropdown = ({ cart, toggleHidden, continueShoppingClick, viewCartClick, HideMiniCart }) => (
  <div className='w-full h-full fixed left-0 top-10'>
    <div className='bg-gray-700 w-full h-full opacity-40' onClick={toggleHidden}></div>
    <div className="absolute w-full sm:w-96 md:w-96 cart-dropdown-h-450 top-0 my-0 sm:mx-1 sm:right-0 bg-white z-50">
      <div className='h-10 mt-1 border-t border-b border-solid pl-2 text-sm text-black'>
        <div className='font-bold text-left mt-2 w-2/3 float-left'>
          {cart.totalQuantity} Items, {cart.totalProducts} products, {cart.total.toFixed(2)} $
        </div>
        <button className='float-right w-8 h-8 text-red-600 text-lg' onClick={HideMiniCart}>X</button>
      </div>
      <div className="cart-drop-down-list-height text-sm mt-2 overflow-y-auto">
        {(cart && cart.products && cart.products.length) ? (
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

const DoAddToCart = async (productId, productCode, updateStatus) => {
  const res = await AddToCart(productId, 1) as IResponseServiceModel;
  if(res.isSuccess){
    //toast("Add '" + productCode + "' to cart successful.");
  }
  else{
    toast.error('Error: ' + res.data);
  }

  updateStatus(true);
}

const AddToCartPopup = ({product, handleCallback}) => {
  const [isdisplay, setIsDisplay] = useState(true);

  const route = useRouter();

  if(!isdisplay || !product){
    return(<></>);
  }  

  const hide = () =>{
    setIsDisplay(false);
    handleCallback();
  }
  
  const viewCartHandleClick = () =>{    
    route.push('/cart');
  }

  let opacity = 0;
  const FadeLoader = () => {
    try{
      const bgElement = document.getElementById('popup-result-bg');
      if(!bgElement){
        return;
      }
  
      if (opacity < 0.3) {
         opacity += 0.02;
         setTimeout(function(){FadeLoader()}, 10);
      }
      bgElement.style.opacity = opacity + '';
    }
    catch(err){}
  } 
  
    // useEffect(() => {
    //   if(isdisplay){
    //     setTimeout(function(){FadeLoader()}, 10);
    //   }
    // }, []);

    if(isdisplay){
      setTimeout(function(){FadeLoader()}, 10);
    }    

  return(
    <>
      <div id='popup-result' className=' w-full h-full fixed left-0 top-0' onClick={hide}>
          <div id="popup-result-bg" className='w-full h-full bg-gray-400' style={{ opacity: '0' }}></div>
          <div className='fixed inset-0 w-full max-w-500 h-350 m-auto'>
              <div className='w-full h-350 bg-white'>
                <div className='text-center mb-2 text-sm py-4 text-green-600'>
                  <p>Add item to cart successful</p>
                </div>

                <div className='px-2 text-sm'>
                  <Image className='float-left' src={product.thumbnail} alt={product.title} width={100} height={100}></Image>
                  <div className='ml-2'>
                    <p className='font-bold'>{product?.sku}</p>
                    <p className='font-bold'>{product?.title}</p>
                    <p>{product?.description}</p>
                    <p className='font-bold text-right'>{product?.price} $</p>
                    <ProductRating rating={product.rating}/>
                  </div>
                </div>

                <div className='bottom-0 absolute mb-4 w-full'>
                  <ContinueAndViewCartButtonCenter continueHandleClick={hide} viewCarthandleClick={viewCartHandleClick}/>
                </div>
              </div>
          </div>
      </div>
    </>
  );
}

export { Cart, UpdateCartInfo, DoAddToCart, AddToCartPopup }
