import React, { useEffect, useState } from 'react'
import { GetCategoryList } from "@/app/services/productService";
import { IResponseServiceModel } from '@/app/models/responseModel';
import Image from 'next/image';
import * as constants from '@/app/constants';
// import Spinner from '@/app/components/loader/spiner';

export default function CategoryBlock(){
    const [cateories, setCateories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const emptyCategories = [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}];

    const t = process.env.NEXT_APP_CLIENT_ID;
    console.log('CLIENTID: ' + t);
         
    useEffect(() => {
        async function FetchCategory(){     
            const res = await GetCategoryList() as IResponseServiceModel;
            if(res.isSuccess)
            {
                setIsLoading(false);
                setCateories(res.data);
            }
        }

        FetchCategory();        
    }, []);

  return (
    <>
        <div className='w-full pt-32'>
            {/* <div className='float-left w-full mt-52'>
                <div className='text-center'>
                    <Spinner/>
                </div>
            </div> */}


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
                        {cateories.map((p, i) => ( <CategoryItem key = {i} id={i+1} category = {p} /> ))}                    
                    </>}                    
                </div>

            {/* {isLoading && <Spinner/>} */}
        </div>
    </>
  )
}

export function CategoryItem(props){
    return(
        <div className="w-52 block mb-8 p-2"> 
            <a className='hover:underline decoration-gray-400' href={'/' + constants.NAV_PRODUCT_LIST + '?cat=' + props.category }>
                <div className='text-center'>
                    <Image className='my-0 mx-auto'
                        alt={props.category}
                        height={100}
                        src={'/images/categories/c/' + props.id +'.svg'}
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
