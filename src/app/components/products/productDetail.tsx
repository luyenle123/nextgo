'use client'

import { Fetcher, GetProductDetailUrl } from "@/app/services/productAPI";
import Image from 'next/image';
import { Loader } from "@/app/components/loader/loader";
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import useSWR from 'swr'
// import * as constants from '@/app/constants'
import { createContext, useContext, useState } from "react";
import Youmayalsolike from "./youmayalsolike";

const ProductContext = createContext(null);

const ProductDetail = ({id}) => {
    const router = useRouter();   
    const { data, error, isLoading } = useSWR(GetProductDetailUrl(id), Fetcher(), {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
      });    
    
    const product = data;

    if(error){
        toast.error(error);
    }

    // if(!product){
    //     return(
    //         <div className='min-h-svh'>
    //             {/* <p>NOT FOUND</p> */}
    //         </div>
    //     );
    // }

    const backToListHandle = () => {
        //router.push('/' + constants.NAV_PRODUCT_LIST);
        router.back();
    }

    const isEmptycl = !product?'empty-item':'';

    return(
        <>
            {isLoading && <Loader isActive={true}/>}
            <div className={'w-full lg:w-2/3 4xl:w-3/5 m-0 mb-3 max-w-1920 mx-auto ' + isEmptycl}>
                <div className="mt-2 cursor-pointer" onClick={() => backToListHandle()}>
                    <span className="text-gray-300">&lt;&lt;</span> Back to list
                </div>

                <ProductContext.Provider value={product}>
                    <PDPHeader/>
                    <PdpSpectTab/>
                </ProductContext.Provider>
            </div>

            {product && <Youmayalsolike currentProduct={product}/>}
        </>
    );
}

export function PDPHeader(){
    const product = useContext(ProductContext);

    const isEmpty = !product;

  return (
    <>
        <div className={'p-2 w-full min-h-52 mt-3 inline-block border-gray-300 border-solid border rounde pdp-header'}>
            <div className="float-left block w-80">
                {product?.images && product.images?.length > 0 ? <Image src={product?.images[0]} alt={product?.title} width={300} height={300}/> : <></>   }
            </div>                
            <p className='font-bold'>{isEmpty ? 'product title' : product.title}</p>
            <p className='uppercase text-xl py-1'>{isEmpty ? 'ABCDE123' : product.sku}</p>
            <p className='text-gray-500'>{isEmpty ? 'category' : product.category}</p>
            <p className='text-gray-500'>{isEmpty ? 'brand' : product.brand}</p>
            <p className='text-gray-600'>{isEmpty ? 'product description product description product description product description' : product.description}</p>
        </div>    
    </>
  )
}

export function PdpSpectTab(){
    const [tabId, setTabId] = useState(1);

    const tabChanged = (id) => {
        setTabId(id);
    }

    const actvie1 = tabId === 1 ? ' bg-gray-300': 'bg-gray-200';
    const actvie2 = tabId === 2 ? ' bg-gray-300': 'bg-gray-200';
    const actvie3 = tabId === 3 ? ' bg-gray-300': 'bg-gray-200';

    return(
    <>
        <div className='w-full border border-solid border-gray-300 mt-5'>
            <div className='w-full flex justify-center border-b border-solid border-gray-300'>
                <div className={'py-3 px-8 cursor-pointer ' + actvie1} onClick={() => tabChanged(1)}>Spec</div>
                <div className={'py-3 px-8 cursor-pointer ' + actvie2} onClick={() => tabChanged(2)}>Gallary</div>
                <div className={'py-3 px-8 cursor-pointer ' + actvie3} onClick={() => tabChanged(3)}>Review</div>
            </div>

            <div className='min-h-80'>
                {tabId === 1 && <Spec/>}
                {tabId === 2 && <Gallery/>}
                {tabId === 3 && <Review/>}
            </div>

        </div>
    </>);
}

export function Spec(){
    const product = useContext(ProductContext);
    const isEmpty = !product;
    return(
        <>
            <div className='p-3'>
                <p>{isEmpty ? '3 year warranty' : product.warrantyInformation}</p>
                <p>{isEmpty ? 'Ships in 1 week' : product.shippingInformation}</p>
                <p>{isEmpty ? 'Out of Stock' : product.availabilityStatus}</p>
                <p>{isEmpty ? '90 days return policy' : product.returnPolicy}</p>
                <p>{isEmpty ? '0.00' : product.rating}</p>
                <p>{isEmpty ? '10.20' : product.discountPercentage}</p>
                <p>{isEmpty ? '0' : product.minimumOrderQuantity}</p>

                {product?.dimensions && 
                <div className='mt-5'>
                    <div className='font-bold'>Dimensions</div>
                    <div className='pl-3'>
                        <div>width: {isEmpty ? '10.10' : product.dimensions.width}</div>
                        <div>height: {isEmpty ? '10.10' : product.dimensions.height}</div>
                        <div>depth: {isEmpty ? '10.10' : product.dimensions.depth}</div>
                    </div>
                </div>}

            </div>        
        </>
    );
}

export function Gallery(){
    const product = useContext(ProductContext);
    return(
        <>
            <div className={'p-3'}>
                {product.images.map((img, i) => 
                <>
                    <Image alt='gallery image' src={img} key={i} width={300} height={300}/>
                </> )}
            </div>        
        </>
    );
}

export function Review(){
    const product = useContext(ProductContext);    
    return(
        <>
            <div className='p-3'>
                <BuildReview reviews={product.reviews}/>
            </div>        
        </>
    );
}

export function BuildReview(props){
    if(!props.reviews){
        return(
            <></>
        );
    }
    return(
        <>
            {props.reviews.map((r) => { return <ReviewItem key={r.reviewerEmail} data={r}/> })}
        </>
    );
}

export function ReviewItem({data}){
    return(
        <div className='py-1 border-b border-solid border-gray-300 mb-2'>                                    
            <p>{data.date}</p>
            <p>{data.reviewerName}</p>
            <p>{data.reviewerEmail}</p>
            <p>{data.comment}</p>            
            <p>{data.rating}</p>
        </div>
    );
}

export { ProductDetail}
