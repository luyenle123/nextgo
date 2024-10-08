import React from 'react'
import { Fetcher, GetCategoryListUrl } from "@/app/services/productAPI";
import Image from 'next/image';
import * as constants from '@/app/constants';
import useSWR from 'swr'

import defaultIcon from '@/app/images/defaul-icon.png';

export default function CategoryBlock(){
    const emptyCategories = [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}];

    const { data, error, isLoading } = useSWR(GetCategoryListUrl(), Fetcher(), {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
      });      

    const categories = data;
    
    if(error){
        console.log(error);
    }

  return (
    <>
        <div className='w-full pt-32 max-w-1920 mx-auto'>
                <div className='uppercase text-3xl sm:text-4xl text-center'>
                    Browse a category
                    <hr className='w-80 my-3 mx-auto border border-solid border-gray-200'/>
                </div>
                <div className='flex flex-wrap pt-7 pb-5 justify-center px-1 md:px-14 lg:px-24'>
                    {isLoading ? 
                    <>
                        {emptyCategories.map((p, i) => ( <CategoryItem key = {i} isEmpty={true}/> ))}
                    </> : 
                    <>
                        {categories.map((p, i) => ( <CategoryItem key = {i} id={i+1} category = {p} /> ))}                    
                    </>}                    
                </div>
        </div>
    </>
  )
}

export function CategoryItem(props){
    const emptycl = props.isEmpty ? ' blur' : '';
    return(
        <div className={'w-1/2 sm:w-52 block mb-8 p-1 sm:p-2 ' + emptycl}> 
            <a className='hover:underline decoration-gray-400' href={'/' + constants.NAV_PRODUCT_LIST + '?cat=' + props.category }>
                <div className='text-center'>
                    {props.isEmpty ? 
                    <>
                        {/* <div className='opacity-50 my-0 mx-auto w-28 h-28 bg-gray-400 bg-opacity-60 blur'/> */}
                        <Image className='my-0 mx-auto opacity-50' alt='category' width={100} height={100} src={defaultIcon}/>
                    </> :
                        <Image className='my-0 mx-auto'
                            alt={props.category}
                            height={100}
                            src={'/images/categories/icon/' + props.id +'.png'}
                            width={100}/>
                    }
                </div>
                
                <div className='text-base text-center pt-2'>
                    {props.isEmpty ? 'category name' : props.category}
                </div>
            </a>
        </div>
    );
}