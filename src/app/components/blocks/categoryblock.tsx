import React from 'react'
import { Fetcher, GetCategoryListUrl } from "@/app/services/productAPI";
import Image from 'next/image';
import * as constants from '@/app/constants';
import useSWR from 'swr'

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
                <div className='uppercase text-4xl text-center'>
                    Browse a category
                    <hr className='w-80 my-3 mx-auto border border-solid border-gray-200'/>
                </div>
                <div className='flex flex-wrap pt-7 pb-5 justify-center px-1 md:px-14 lg:px-24'>
                    {isLoading ? 
                    <>
                        {emptyCategories.map((p, i) => ( <EmptyCategoryItem key = {i}/> ))}
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
    return(
        <div className="w-52 block mb-8 p-2"> 
            <a className='hover:underline decoration-gray-400' href={'/' + constants.NAV_PRODUCT_LIST + '?cat=' + props.category }>
                <div className='text-center'>
                    <Image className='my-0 mx-auto opacity-60'
                        alt={props.category}
                        height={100}
                        src={'/images/categories/icon/' + props.id +'.png'}
                        width={100}/>
                </div>
                
                <div className='text-lg text-center font-bold'>
                    {props.category}
                </div>
            </a>
        </div>
    );
}

export function EmptyCategoryItem(){
    return(
        <div className="w-52 block mb-8 blur-sm"> 
            <div className='text-center'>
                <div className='opacity-50 my-0 mx-auto w-28 h-28 bg-gray-500 bg-opacity-50 blur-sm'/>
            </div>
            
            <div className='text-lg text-center font-bold'>
                category name
            </div>
        </div>
    );
}
