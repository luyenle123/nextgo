/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import React, { useState } from 'react'
import { SearchProduct } from "@/app/services/productService";
import { toast } from 'react-toastify';
import { LoaderToggle } from "@/app/components/loader/loader";
import { DoAddToCart, UpdateCartInfo } from "@/app/components/cart/cart";
import { IResponseServiceModel } from "@/app/models/responseModel";
import { IProductItem } from '@/app/models/productmodel';
import { ProductCard } from '../products/productCard';
import searchIcon from '@/app/images/search-icon-100.png';
import Image from 'next/image';
import CartPopupResult from '../cart/cartPopupResult';

export default function Search(){
  const [products, setProducts] = useState<IProductItem[] | undefined>(undefined);
  const [key, setKey] = useState('');
  const [cartProduct, setCartProduct] = useState<IProductItem | undefined>(undefined);  

  const handleSearchClick = async () => {
    if(!key || key.length < 3) return;
    LoaderToggle(true);
    const res = await SearchProduct(key) as IResponseServiceModel;
    if(res.isSuccess)
    {
        setProducts(res.data.products);
    }
    else{
        toast('Error: ' + res.data);
    }

    LoaderToggle(false);
  }

  const handleAddToCartClick = (product) => {
    LoaderToggle(true);
    const productId = product.id;
    DoAddToCart(productId, product.sku, () => {
      LoaderToggle(false, () => {
        setCartProduct(product);
      });
      UpdateCartInfo(null, 1);
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && key && key.length>=3) {
      handleSearchClick();
    }
  }

  return (
    <div className='sm:p-2'>
        <div className='w-full sm:w-3/4 md:search-form-width lg:search-form-width xl:search-form-width 2xl:search-form-width max-w-2xl mt-0 mx-auto bg-gray-200 sm:rounded border-gray-400'>
            <div className='p-7 flex'>
                <input className='h-10 w-full rounded-l text-lg pl-1 outline-none' placeholder='search product' maxLength={50} autoFocus onChange={(e) => setKey(e.target.value)} onKeyDown={handleKeyDown}></input>
                <button className='h-10 w-12 bg-gray-100 border-l rounded-r font-bold hover:bg-gray-400 active:bg-gray-300' onClick={handleSearchClick} onKeyDown={handleKeyDown}>
                  <Image src={searchIcon} width={30} height={30} alt='search' className='my-0 mx-auto opacity-50'></Image>
                </button>
            </div>
        </div>

        <div className='mt-1 min-h-600 w-full'>
          {!products || products.length <= 0 ? <div className='mx-auto text-center pt-12 w-full'>No Result</div> : <></>}

          {products && products.length > 0 &&
            <>
              <div className='ml-2'>
                Found: {products.length} entries
              </div>

              <div className="flex flex-wrap justify-left">
                    {products.map((product, i) => (
                    <ProductItemContainer  key = {i} product={product} handleAddToCartClick={handleAddToCartClick}/>
                    ))}
                </div>
            </>
          }       
        </div>

        { cartProduct && <CartPopupResult product={cartProduct} handleCallback={() => { setCartProduct(undefined)}}/> }
    </div>
  )
}

export function ProductItemContainer({product, handleAddToCartClick}){
  return(
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/4 2xl:w-1/5 relative">
      <ProductCard product={product} handleAddToCartClick={handleAddToCartClick}/>
    </div>   
  );
}