/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import React, { useEffect, useState } from 'react'
import { SearchProduct } from "@/app/services/productService";
import { toast } from 'react-toastify';
import { LoaderToggle } from "@/app/components/loader/loader";
import { DoAddToCart, UpdateCartInfo } from "@/app/components/cart/cart";
import { IResponseServiceModel } from "@/app/models/responseModel";
import { IProductItem } from '@/app/models/productmodel';
import { ProductCard } from '../products/productCard';
import CartPopupResult from '../cart/cartPopupResult';
import SearchBox from './searchBox';
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation';

export default function Search(){
  const [products, setProducts] = useState<IProductItem[] | undefined>(undefined);
  const [cartProduct, setCartProduct] = useState<IProductItem | undefined>(undefined);
  const [searchText, setSearchText] = useState('');
  const searchParams = useSearchParams();
  const text = searchParams.get('text');
  const router = useRouter();

  const removeUrlParameter = (param) => {
    // Create a new URL object based on the current URL
    const url = new URL(window.location.href);
    // Remove the specified parameter
    url.searchParams.delete(param);
    // Update the URL without reloading the page
    router.push(url.pathname + url.search);
  };  

  useEffect(() => {
    async function Search(searchText) {
      LoaderToggle(true);
      const res = await SearchProduct(searchText) as IResponseServiceModel;
      if(res.isSuccess)
      {
          setSearchText(searchText);
          setProducts(res.data.products);
      }
      else{
          toast('Error: ' + res.data);
      }
  
      LoaderToggle(false);
    }

    if(text && text.length >= 3){
      Search(text);

      removeUrlParameter('text');
    }    
  }, [text]); 

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

  let textSearch = text;
  const handleSearch = async (key) => {
    LoaderToggle(true);
    const res = await SearchProduct(key) as IResponseServiceModel;
    if(res.isSuccess)
    {
      setSearchText(key);
      setProducts(res.data.products);
      textSearch = key;
    }
    else{
        toast('Error: ' + res.data);
    }

    LoaderToggle(false);
  }  

  return (
    <div className='sm:p-2'>

        <SearchBox handleSearch={handleSearch} text={text}/>

        <div className='mt-1 min-h-600 w-full'>
          {!products || products.length <= 0 ? <div className='mx-auto text-center pt-12 w-full'>No Result</div> : <></>}

          {products && products.length > 0 &&
            <>
              <div className='ml-2'>
                Found: {products.length} entries for <span className='font-bold'>{searchText}</span>
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