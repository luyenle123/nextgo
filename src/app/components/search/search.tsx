/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import React, { useEffect, useState } from 'react'
import { SearchProduct } from "@/app/services/productService";
import { toast } from 'react-toastify';
import { LoaderToggle } from "@/app/components/loader/loader";
import { DoAddToCart, UpdateCartInfo } from "@/app/components/cart/cart";
import { IResponseServiceModel } from "@/app/models/responseModel";

import Image from 'next/image.js';
import Link from 'next/link';

const Search = () => {
  const [products, setProducts] = useState([]);
  const [key, setKey] = useState('');

  const inputRef = React.useRef();

  useEffect(() => {
    if(inputRef && inputRef.current)
    {
      //inputRef.current.focus();
    }
  }, []);

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

const updateStatus = (b) => {
  LoaderToggle(false);
  UpdateCartInfo(null, 1);
}

const handleAddToCartClick = (product) => {
  LoaderToggle(true);
  const productId = product.id;
  DoAddToCart(productId, product.sku, updateStatus);
};

const handleKeyDown = (event) => {
  if (event.key === 'Enter' && key && key.length>=3) {
    handleSearchClick();
  }
}


  return (
    <div className='p-2'>
        <div className='w-full sm:w-3/4 md:search-form-width lg:search-form-width xl:search-form-width 2xl:search-form-width max-w-2xl mt-0 mx-auto bg-gray-200 rounded border-gray-400'>
            <div className='p-8 flex'>
                <input className='h-9 w-full rounded-l text-xl pl-1 outline-none' maxLength={50} ref={inputRef} autoFocus onChange={(e) => setKey(e.target.value)} onKeyDown={handleKeyDown}></input>
                <button className='h-9 w-32 bg-gray-300 rounded-r font-bold hover:bg-gray-400 active:bg-gray-300' onClick={handleSearchClick} onKeyDown={handleKeyDown}>Search</button>
            </div>
        </div>

        <div className='mt-1'>
          {products.length <= 0 && <div className='w-96 my-0 mx-auto text-center pt-12 min-h-700'>No Result</div>}

          {
            products.length > 0 &&
            <>
              <div className='ml-2'>
                Found: {products.length} entries
              </div>

              <div className="flex flex-wrap justify-left">
                    {products.map((product, i) => (
                    <ProductItem  key = {i} product={product} handleAddToCartClick={handleAddToCartClick}/>
                    ))}
                </div>
            </>
          }       
        </div>

    </div>
  )
}

export function ProductItem({product, handleAddToCartClick}){
  return(
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/4 2xl:w-1/5 relative">
      <div className="productcard-min-h bg-slate-200 m-1 p-2">
        <div className="w-60 mx-auto my-0 mt-5">
          <Link href={'/products/'+product .id} className="font-bold">
            <Image src={product .thumbnail} alt={product .title} width={200} height={200}/>  
          </Link>                        
        </div>

        <Link href={'/products/'+ product .id} className="font-bold">
          {product .sku}
        </Link>

        <p>{product .title}</p>
        <p>{product .description}</p>
        <p>{product .category}</p>

        <p className="text-right">Instock({product .stock})</p>
        <p className="text-right font-bold">{product .price} $</p>

        <div className="absolute bottom-0 mb-3">
        <button onClick={() => handleAddToCartClick(product )} className="py-2 px-4 text-emerald-800 font-bold bg-slate-300 hover:bg-slate-400 active:bg-slate-300">Add To Cart</button>
        </div>
      </div>
    </div>   
  );
}

export { Search }