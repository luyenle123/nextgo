import { Fetcher, GetCategoryAndProductUrl } from '@/app/services/productAPI';
import React from 'react'
import useSWR from 'swr';
import { ProductCard, ProductCardEmpty } from './productCard';

export default function Youmayalsolike({currentProduct}){
    const productEmptyList = [{},{},{},{},{},{}];

    const category = currentProduct?.category;
    const url = GetCategoryAndProductUrl(category, 1, 6, 1);
    const { data, error } = useSWR(url, Fetcher(), {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
      });

    if(error){
        console.log(error);
    }
    
    // if(!currentProduct || !data || !data.products){
    //     return(<></>);
    // }

    const products = data?.products.filter((p) => p.id != currentProduct?.id);
  return (
    <>
        <div className='w-full min-h-105 py-5 max-w-1920 mx-auto'>
            <div className='py-10 text-center uppercase text-3xl'>
                You may also like
            </div>

            <div className='w-full flex flex-wrap overflow-x-auto'>
                {products && products.length > 0 ? 
                <>
                    { products.map((product, i) => (<ProductItemContainer  key = {i} product={product} />)) }
                </> : 
                <>
                    { productEmptyList.map((p, i) => (<ProductItemContainer key={i} isEmpty={true}/>)) }
                </>}
            </div>
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
