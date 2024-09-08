/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import {useEffect, useState} from 'react'
import { LoaderToggle } from "@/app/components/loader/loader";
import { GetCartDetail } from "@/app/services/cartService";
import { IResponseServiceModel } from "@/app/models/responseModel";
import { toast } from 'react-toastify';

import '../../styles/cart.css';
import Image from 'next/image';

export default function CartPageDetail(){

    const [cart, setCart] = useState({id:0, products:[]}); 
    
    const doGetCartDetail = async() => {
        LoaderToggle(true);
        const res = await GetCartDetail(5) as IResponseServiceModel;
        if(res.isSuccess)
        {
            setCart(res.data);
        }
        else{
            toast.error(res.data);
        }

        LoaderToggle(false);
    }    

    useEffect(() => {
        doGetCartDetail();
    }, []);

    const handleGoToCheckoutClick = (e) => {
        LoaderToggle(true);
        setTimeout(() => {
            toast('There are some item is invalid.');
            LoaderToggle(false);
        }, 1000);
    };
    
    const handleQuantityUpClick = (e) => {
        LoaderToggle(true);
        setTimeout(() => {
            toast('Change quantity');
            LoaderToggle(false);
        }, 500);        
    };

    const handleQuantityDownClick = (e) => {
        LoaderToggle(true);
        setTimeout(() => {
            toast('Change quantity');
            LoaderToggle(false);
        }, 500);  
    };
    
    const handleRemoveCartItemClick = (e) => {
        LoaderToggle(true);
        setTimeout(() => {
            toast('Remove item: ' + e.target.value);
            LoaderToggle(false);
        }, 1000);         
    };

    const data = {
        handleQuantityUpClick: handleQuantityUpClick,
        handleQuantityDownClick: handleQuantityDownClick,
        handleRemoveCartItemClick: handleRemoveCartItemClick,
        handleGoToCheckoutClick: handleGoToCheckoutClick
    };

    const hasData = cart && cart.id;

  return (
    <>    
        <div className='cart-detail-container'>

            <div className='cart-detail-header'>
                Cart Detail
            </div>

            <div className="cart-products">
                {cart.products.map((p) => {
                    return <ProductItem key = {p.id} product = {p} eventhandle={data}/>
                })}
            </div>

            {hasData && <CartSummary cart={cart} eventhandle={data}/> }
        </div>
    </>
  )
}

export function CartSummary(props){
    return(
        <>
            <div className='cart-summary-container'>
                <div className='cart-summary'>
                    <div className='cart-summary-header'>Summary</div>                

                    <div className='cart-detail-summary'>
                        <div className='cart-detail-summary-item'>
                            <div className='cart-detail-summary-item-label'>Products</div>
                            <div className='cart-detail-summary-item-number'>{props.cart.totalProducts}</div>
                        </div>

                        <div className='cart-detail-summary-item'>
                            <div className='cart-detail-summary-item-label'>Total quantity</div>
                            <div className='cart-detail-summary-item-number'>{props.cart.totalQuantity}</div>
                        </div>

                        <div className='cart-detail-summary-item'>
                            <div className='cart-detail-summary-item-label'>Total discount</div>
                            <div className='cart-detail-summary-item-number'>{props.cart.discountedTotal} $</div>
                        </div>
                    </div>

                    <div className='cart-detail-total'>
                        <p>Total: {props.cart.total} $</p>
                        <p>Shipping: FREE</p>
                    </div>

                    <div className='cart-detail-address'>
                        <div className='cart-detail-billing-address'>
                            <div className='address-header'>Billing Address</div>
                            <span>Mr  Emily Johnson</span><br/>
                            <span>626 Main Street</span><br/>
                            <span>Wembley WA 6014</span><br/>
                            <span>emily.johnson@x.dummyjson.com</span><br/>
                            <span>+81 965-431-3024</span>
                        </div>

                        <div className='cart-detail-shipping-address'>
                            <div className='address-header'>Shipping Address</div>
                            <span>Mr  Emily Johnson</span><br/>
                            <span>626 Main Street</span><br/>
                            <span>Wembley WA 6014</span><br/>
                            <span>emily.johnson@x.dummyjson.com</span><br/>
                            <span>+81 965-431-3024</span>
                        </div>
                    </div>

                    <div className='cart-summary-buttons'>
                        <button className='checkout-button' onClick={props.eventhandle.handleGoToCheckoutClick}>Go to Checkout</button>
                    </div>
                </div>
            </div>        
        </>
    );
}

export function ProductItem(props){
    return(
        <div className="cart-detail-item">
            <div className="cart-detail-item-img">
                <Image src={props.product.thumbnail} alt={props.product.title} width={75} height={75}/>  
            </div>
            <div className='cart-detail-item-productdetail'>
                <div className="cart-detail-item-title">
                    <a href={'/products/' + props.product.id}>
                        {props.product.title}
                    </a>
                </div>
                <div className="cart-detail-item-quantity">
                    <button className='quantity-adjust-button' onClick={props.eventhandle.handleQuantityDownClick}>-</button>
                    <div className='txt-quantity'>{props.product.quantity}</div>
                    <button className='quantity-adjust-button' onClick={props.eventhandle.handleQuantityUpClick}>+</button>
                </div>
                <div className="cart-detail-item-price">{props.product.price} $</div>
                <div className="cart-detail-item-total">{props.product.total.toFixed(2)} $</div>
                <div className="cart-detail-item-remove">
                    <button className='cart-detail-item-remove-button' onClick={props.eventhandle.handleRemoveCartItemClick} title='Delete' value={props.product.id}>X</button>
                </div>
            </div>
        </div>
    );
}