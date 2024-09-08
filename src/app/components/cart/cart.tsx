/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import '@/app/styles/cart.css';
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
      console.log('Updatae cart info :' + res.data.totalQuantity);
    }
  }

  return res;
}

const Cart = () => {
  const [showMiniCart, setShowMiniCart] = useState(false);
  const [cart, setCart] = useState({totalQuantity:0, total:0, totalProducts:0});
  const route = useRouter();

  console.log('Cart Info');

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
        setCart({totalQuantity:0, total:0, totalProducts:0});
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

  return (
    <>
      <div className='cart-info'>
        <div className='cart-icon'>
          <Image src={cartIcon} alt='cart' onClick={handleCartClick} width={40} height={40}/>
          <div id='cart-item-number' className='cart-item-number'>{cart.totalQuantity}</div>
        </div>
        {showMiniCart && <CartDropdown cart={cart} toggleHidden = { HideMiniCart} continueShoppingClick = {handleContinueClick} viewCartClick={handleViewCartClick}/> }
      </div>    
    </>
  )
}

const CartDropdown = ({ cart, toggleHidden, continueShoppingClick, viewCartClick }) => (
  <div className='cart-dropdown-container'>
    <div className='cart-dropdown-bg' onClick={toggleHidden}></div>
    <div className="cart-dropdown">
      <div className='cart-dropdown-header'>
        <p>
          {cart.totalQuantity} Items, {cart.totalProducts} products, {cart.total.toFixed(2)} $
        </p>
      </div>      
      <div className="cart-items">
        {(cart && cart.products && cart.products.length) ? (
          cart.products.map(item => <ProductItem key={item.id} product = {item} />)
        ) : (
          <div className="empty-message"> Your cart is empty </div>
        )}
      </div>
      <div className='cart-dropdown-buttons'>
        <button className={'base-button continue-button'} onClick={continueShoppingClick}>Continue Shopping</button>
        <button className={'base-button viewcart-button'} onClick={viewCartClick}>View Cart</button>
      </div>
    </div>
  </div>
);

export function ProductItem({product}){
  return(
    <div className='cart-items-row'>
      <div className='cart-items-img-container'>
        <Link href={'/products/' + product.id}>
          <Image src={product.thumbnail} alt={product.title} width={45} height={45}/>
        </Link>
      </div>
      
      <div className='cart-items-row-detail'>
        <div className="cart-items-title">
          <Link href={'/products/' + product.id}>
            {product.title}
          </Link>          
          </div>
          <div className='cart-items-r-value'>
            <div className='cart-items-quantity number-box'>{product.quantity}</div>
            <div className='cart-items-price number-box'>{product.price} $</div>
          </div>
      </div>
    </div>
  );
}

const DoAddToCart = async (productId, productCode, updateStatus) => {
  const res = await AddToCart(productId, 1) as IResponseServiceModel;
  if(res.isSuccess){
    toast("Add '" + productCode + "' to cart successful.");
  }
  else{
    toast.error('Error: ' + res.data);
  }

    updateStatus(true);
}

export { Cart, UpdateCartInfo, DoAddToCart }
