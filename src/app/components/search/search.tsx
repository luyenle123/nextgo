/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import React, { useEffect, useState } from 'react'
import { Fetcher, SearchProductUrl } from "@/app/services/productAPI";
import { toast } from 'react-toastify';
import { Loader } from "@/app/components/loader/loader";
// import { DoAddToCart, UpdateCartInfo } from "@/app/components/cart/cart";
import { IProductItem } from '@/app/models/productmodel';
import { ProductCard, ProductCardEmpty } from '../products/productCard';
import CartPopupResult from '../cart/cartPopupResult';
import SearchBox from './searchBox';
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation';
import useSWR from 'swr'
import Fourcolumnblock from '@/app/components/blocks/fourcolumnblock';

export default function Search(){
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

  let textToSearch = searchText;
  if(text && text.length >= 3){
    textToSearch = text;    
  }

  const { data, error, isLoading } = useSWR(SearchProductUrl(textToSearch), Fetcher(), {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  let products = data?.products;
  let isEmpty = false;
  if(isLoading){
    products = [{},{},{},{},{},{},{},{},{},{}];
    isEmpty = true;
  }

  if(error){
    toast.error(error);
  }  

  useEffect(() => {
    if(text){
      setSearchText(text);
      removeUrlParameter('text');
    } 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = async (key) => {
    setSearchText(key);

    if(text){
      removeUrlParameter('text');
    } 
  }  

  const emptycl = isEmpty ? 'empty-item' : '';
  return (    
    <>
      <div className='w-full -mt-32 absolute'>
        <SearchBox handleSearch={handleSearch} text={text}/>
      </div>

      {isLoading && <Loader isActive={true}/>}

      <div className='sm:p-2 mt-10'>
        <div className='mt-1 min-h-600 w-full max-w-1920 mx-auto'>
          {products && products.length <= 0 ? <div className='mx-auto text-center pt-12 w-full text-gray-400'>No Result</div> : <></>}

          {products && products.length > 0 &&
            <>
              <div className={'ml-1 ' + emptycl}>
                Found: {products.length} entries for <span className='font-bold'>{searchText}</span>
              </div>

              <div className={'flex flex-wrap justify-left'  + emptycl}>
                    {products.map((product, i) => (
                      <ProductItemContainer  key = {i} product={product} isEmpty={isEmpty}/>
                    ))}
                </div>
            </>
          }
        </div>

        <div className='mt-1 w-full'>
          <Fourcolumnblock/>
        </div>        

        { cartProduct && <CartPopupResult product={cartProduct} handleCallback={() => { setCartProduct(undefined)}}/> }
      </div>

    </>
  )
}

export function ProductItemContainer(props){
  return(
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/4 2xl:w-1/5 relative">
       {props.isEmpty ? <ProductCardEmpty/> : <ProductCard product={props.product}/>}
    </div>   
  );
}