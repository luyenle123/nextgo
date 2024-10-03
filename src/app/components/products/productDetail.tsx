'use client'

import { Fetcher, GetProductDetailUrl } from "@/app/services/productAPI";
import Image from 'next/image';
import { Loader } from "@/app/components/loader/loader";
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import useSWR from 'swr'
// import * as constants from '@/app/constants'
import { createContext, useContext, useState } from "react";

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

    if(!product){
        return(
            <div className='min-h-svh'>
                {/* <p>NOT FOUND</p> */}
            </div>
        );
    }

    const backToListHandle = () => {
        //router.push('/' + constants.NAV_PRODUCT_LIST);
        router.back();
    }

    return(
        <>
            {isLoading && <Loader isActive={true}/>}
            <div className="w-full lg:w-2/3 m-0 mx-auto mb-3">
                <div className="mt-2 cursor-pointer" onClick={() => backToListHandle()}>
                    <span className="text-gray-300">&lt;&lt;</span> Back to list
                </div>

                <ProductContext.Provider value={product}>
                    <PDPHeader/>
                    <PdpSpectTab/>
                </ProductContext.Provider>
            </div>            
        </>
    );
}

export function PDPHeader(){
    const product = useContext(ProductContext);

  return (
    <>
        <div className={'p-2 w-full min-h-52 mt-3 inline-block border-gray-300 border-solid border rounde pdp-header'}>
            <div className="float-left block w-80">
                {product.images && product.images.length > 0 ? <Image src={product.images[0]} alt={product.title} width={300} height={300}/> : <></>   }
            </div>                
            <p className='font-bold'>{product.title}</p>
            <p className='uppercase text-xl py-1'>{product.sku}</p>
            <p className='text-gray-500'>{product.category}</p>
            <p className='text-gray-500'>{product.brand}</p>
            <p className='text-gray-600'>{product.description}</p>
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
    return(
        <>
            <div className='p-3'>
                <p>{product.warrantyInformation}</p>
                <p>{product.shippingInformation}</p>
                <p>{product.availabilityStatus}</p>
                <p>{product.returnPolicy}</p>
                <p>{product.rating}</p>
                <p>{product.discountPercentage}</p>
                <p>{product.minimumOrderQuantity}</p>

                {product.dimensions && 
                <div className='mt-5'>
                    <div className='font-bold'>Dimensions</div>
                    <div className='pl-3'>
                        <div>width: {product.dimensions.width}</div>
                        <div>height: {product.dimensions.height}</div>
                        <div>depth: {product.dimensions.depth}</div>
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
