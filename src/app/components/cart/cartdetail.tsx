/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { LoaderToggle } from "@/app/components/loader/loader";
import { Fetcher, GetCartDetailUrl } from "@/app/services/cartAPI";
import { toast } from 'react-toastify';
import deletIcon from '@/app/images/icon-delete.svg'
import Image from 'next/image';
import { CartItemQuantity } from '@/app/components/buttons/commonButton';
import useSWR from 'swr';

export default function CartDetail(){
    const emptyCart = {};
    const url = GetCartDetailUrl(4);   
    const { data, error, isLoading } = useSWR(url, Fetcher(), {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
      });    

    if(error){
        toast.error(error);
    }

    const handleGoToCheckoutClick = (e) => {
        LoaderToggle(true);
        setTimeout(() => {
            toast('There are some item is invalid.');
            LoaderToggle(false);
        }, 1000);
    };

    const handleQuantityChangeClick = (e) => {
        LoaderToggle(true);
        setTimeout(() => {
            toast('Change quantity: ' + e);
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

    const config = {
        handleQuantityChangeClick: handleQuantityChangeClick,
        handleRemoveCartItemClick: handleRemoveCartItemClick,
        handleGoToCheckoutClick: handleGoToCheckoutClick
    };

    let cart = data;
    const hasData = cart && cart.id > 0;
    let isEmpty = false;
    if(isLoading){
        cart = {
            products: [{},{},{},{}]
        };
        isEmpty = true;
    }

    const emptycl = isEmpty ? ' empty-item' : '';
    return (
        <>
            <div className={'inline-block w-full py-2 px-1 m:px-40 mb-5 min-h-700' + emptycl}>
                <div className='text-center my-3 mx-0 text-2xl'>
                    <div className='font-bold'>Your Cart</div> <div className='text-sm'>( total {cart?.totalQuantity} / {cart?.totalProducts} products )</div>
                    <hr className='w-60 mt-2 mx-auto'/>
                    <hr className='w-28 mt-2 mx-auto'/>
                    <hr className='w-10 mt-2 mx-auto'/>
                </div>
    
                <div className="w-full lg:w-4/5 2xl:w-3/5 md:pr-2 justify-center mt-10 mx-auto">
                    {cart?.products && cart?.products.length > 0 && <TableHeader/> }
                    {cart?.products.map((p) => {
                        return <ProductItem key = {p.id} product = {p} eventhandle={config} isEmpty={isEmpty}/>
                    })}
    
                    <CartSummary cart={cart} eventhandle={config} isEmpty={isEmpty}/>
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
            <div className='float-right w-full sm:w-1/2 md:w-1/3'>
                <div className='my-5 bg-gray-200 p-2 rounded-md'>
                    <SummaryItem text = {'Sub total'} value = {props.isEmpty ? '00.00' : props.cart?.total}/>
                    <SummaryItem text = {'Sales Tax'} value = '0.00 $'/>
                    <SummaryItem text = {'Products'} value = {props.isEmpty ? '00' : props.cart?.totalProducts}/>
                    <SummaryItem text = {'Total quantity'} value = {props.isEmpty ? '00' : props.cart?.totalQuantity}/>
                    <SummaryItem text = {'Total discount'} value = {props.isEmpty ? '00.00' : props.cart?.discountedTotal}/>
                </div>
    
                <div className='text-right font-bold mr-1'>
                    <p className='text-lg'>Total: {props.cart?.total} $</p>
                    <p>Shipping: FREE</p>
                </div>
    
                <div className='bottom-0 w-full mt-10'>
                    <button className='w-1/2 p-2 float-right text-white bg-blue-500 border rounded-md border-solid' onClick={props.eventhandle.handleGoToCheckoutClick}>Checkout</button>
                </div>
            </div>
        );
    }
    
    export function TableHeader(){
        return(
            <div className="hidden md:block p-2 font-bold text-center bg-gray-100 h-10 mb-2">
                <div className='md:flex text-sm'>
                    <div className="w-full md:w-7/12">Title</div>
                    <div className="w-full md:w-1/12 text-right">Price</div>
                    <div className="w-full h-8 md:w-2/12 text-center">Quantity</div>                
                    <div className="w-full h-8 md:w-1/12 text-right">Total</div>
                    <div className="w-full h-8 md:w-1/12">
                    </div>
                </div>
            </div>
        );
    }
    
    export function ProductItem(props){
        return(
            <div className="border-b border-solid border-gray-200 mb-2 p-2">
                <div className='md:flex text-sm'>
                    <div className="w-full md:w-7/12">
                        <div className="h-full w-20 relative float-left">
                            {props.isEmpty ? <div className="w-16 h-16 bg-gray-300"></div> : <Image src={props.product.thumbnail} alt={props?.product?.title} width={100} height={100}/>}
                        </div>                
                        <div>
                            <p>{props.isEmpty ? '00' : props.product.id}</p>
                            <a className='font-bold' href={'/products/' + props.product.id}>
                                {props.isEmpty ? 'Green and Black Glasses' : props.product.title}
                            </a>
                            <p>
                                {props.isEmpty ? 'Green and Black Glasses' : props.product.title}
                            </p>
                        </div>
                    </div>
    
                    <div className="w-full md:w-1/12 font-bold text-right mt-1">{props.isEmpty ? '00' : props.product.price} $</div>
    
                    <div className="w-full h-8 md:w-2/12">
                        <CartItemQuantity quantity={props.isEmpty ? '0' : props.product?.quantity} handleClick={props.eventhandle.handleQuantityChangeClick}/>
                    </div>
                    
                    <div className="w-full h-8 md:w-1/12 font-bold text-right mt-1">{props.isEmpty ? '0.00' : props.product?.total?.toFixed(2)} $</div>
                    <div className="w-full h-8 md:w-1/12">
                        <Image src={deletIcon} width={20} height={20} title='Remove' alt='Remove' className='float-right cursor-pointer' onClick={() => props.eventhandle.handleRemoveCartItemClick(props.product)}></Image>
                    </div>
                </div>
            </div>
        );
    }