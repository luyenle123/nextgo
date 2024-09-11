/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import {useEffect, useState} from 'react'
import { LoaderToggle } from "@/app/components/loader/loader";
import { GetCartDetail } from "@/app/services/cartService";
import { IResponseServiceModel } from "@/app/models/responseModel";
import { toast } from 'react-toastify';

import deletIcon from '@/app/images/icon-delete.svg'
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
            toast('Remove item: ' + e.id);
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
        <div className='inline-block w-full py-2 px-1 m:px-40'>

            <div className='text-center text-4xl font-bold my-5 mx-0'>
                Cart Detail
            </div>

            <div className='w-full md:flex justify-center'>
                <div className="w-full md:w-3/5 md:pr-2">
                    {cart.products.map((p) => {
                        return <ProductItem key = {p.id} product = {p} eventhandle={data}/>
                    })}
                </div>

                {hasData && <CartSummary cart={cart} eventhandle={data}/> }
            </div>
        </div>
    </>
  )
}

export function CartSummary(props){

    const SummaryItem = ({text, value}) => {
        return(
            <div className='w-full h-5'>
                <div className='w-1/2 float-left text-left'>{text}</div>
                <div className='w-1/2 float-right text-right'>{value}</div>
            </div>            
        );
    }

    return(
        <div className='w-full md:w-96 float-left bg-gray-100 border border-solid border-gray-300 rounded-md p-2'>
            <div className='cart-summary'>
                <div className='text-xl pb-2 border-b border-solid border-gray-300'>Summary</div>                

                <div className='my-5 pb-5'>
                    <SummaryItem text = {'Products'} value = {props.cart.totalProducts}/>
                    <SummaryItem text = {'Total quantity'} value = {props.cart.totalQuantity}/>
                    <SummaryItem text = {'Total discount'} value = {props.cart.discountedTotal}/>
                </div>

                <div className='text-right font-bold'>
                    <p>Total: {props.cart.total} $</p>
                    <p>Shipping: FREE</p>
                </div>

                <div className='mt-12'>
                    <div className='mb-5'>
                        <div className='mb-1 font-bold uppercase border-b border-gray-300'>Billing Address</div>
                        <span>Mr  Emily Johnson</span><br/>
                        <span>626 Main Street</span><br/>
                        <span>Wembley WA 6014</span><br/>
                        <span>emily.johnson@x.dummyjson.com</span><br/>
                        <span>+81 965-431-3024</span>
                    </div>

                    <div className='cart-detail-shipping-address'>
                        <div className='mb-1 font-bold uppercase border-b border-gray-300'>Shipping Address</div>
                        <span>Mr  Emily Johnson</span><br/>
                        <span>626 Main Street</span><br/>
                        <span>Wembley WA 6014</span><br/>
                        <span>emily.johnson@x.dummyjson.com</span><br/>
                        <span>+81 965-431-3024</span>
                    </div>
                </div>

                <div className='bottom-0 w-full'>
                    <button className='w-full p-2 text-white bg-blue-400 border rounded-md border-solid mt-12' onClick={props.eventhandle.handleGoToCheckoutClick}>Go to Checkout</button>
                </div>
            </div>
        </div>
    );
}

export function ProductItem(props){
    return(
        <div className="h-24 border border-solid border-gray-300 rounded-md mb-2 p-2">
            <div className="h-full w-20 relative float-left">
                <Image src={props.product.thumbnail} alt={props.product.title} width={75} height={75}/>  
            </div>
            <div className='flex text-sm'>
                <div className="w-7/12">
                    <a href={'/products/' + props.product.id}>
                        {props.product.title}
                    </a>
                </div>
                <div className="w-2/12">
                    <div className='flex float-right'>
                        <button className='w-6 h-8 text-center mx-0 border-t border-l border-b border-solid border-gray-200 rounded-l' onClick={props.eventhandle.handleQuantityDownClick}>-</button>
                        <div className='w-8 h-8 text-center mx-0 pt-1 border-t border-b border-solid bg-gray-100 border-gray-200'>{props.product.quantity}</div>
                        <button className='w-6 h-8 text-center border-r border-t border-b border-solid border-gray-200 rounded-r' onClick={props.eventhandle.handleQuantityUpClick}>+</button>
                    </div>
                </div>
                <div className="w-1/12 font-bold text-right mt-1">{props.product.price} $</div>
                <div className="w-1/12 font-bold text-right mt-1">{props.product.total.toFixed(2)} $</div>
                <div className="w-1/12">
                    <Image src={deletIcon} width={20} height={20} alt='Remove' className='float-right cursor-pointer' onClick={() => props.eventhandle.handleRemoveCartItemClick(props.product)}></Image>
                    {/* <button className='w-8 h-8 float-right text-red-500 font-bold cursor-pointer border rounded border-solid border-gray-200' onClick={props.eventhandle.handleRemoveCartItemClick} title='Delete' value={props.product.id}>X</button> */}
                </div>
            </div>
        </div>
    );
}