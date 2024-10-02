'use client'

import { Fetcher, GetProductDetailUrl } from "@/app/services/productAPI";
import Image from 'next/image';
import { Loader } from "@/app/components/loader/loader";
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import useSWR from 'swr'
import * as constants from '@/app/constants'

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
        router.push('/' + constants.NAV_PRODUCT_LIST);
    }

    return(
        <>
            {isLoading && <Loader isActive={true}/>}
            <div className="w-full lg:w-2/3 m-0 mx-auto mb-3">
                <div className="mt-2 font-bold cursor-pointer" onClick={() => backToListHandle()}>
                    Back to list
                </div>
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

                <div className={'p-2 w-full min-h-52 mt-3 inline-block border-gray-300 border-solid border rounde pdp-spec'}>
                    <p>{product.warrantyInformation}</p>
                    <p>{product.shippingInformation}</p>
                    <p>{product.availabilityStatus}</p>
                    <p>{product.returnPolicy}</p>
                </div>
                
                <div className={'p-2 w-full min-h-52 mt-3 inline-block border-gray-300 border-solid border rounde pdp-gallery'}>
                    <p>Gallery</p>
                </div>             

                <div className={'p-2 w-full min-h-52 mt-3 inline-block border-gray-300 border-solid border rounde pdp-review'}>
                    <BuildReview reviews={product.reviews}/>
                </div>
            </div>            
        </>
    );
}

export function BuildReview({reviews}){
    if(!reviews){
        return(
            <></>
        );
    }
    return(
        <>
            {reviews.map((r) => {
                return <ReviewItem key={r.reviewerEmail} data={r}/>
            })}        
        </>
    );
}

export function ReviewItem({data}){
    return(
        <div className="review-item">                                    
            <p>{data.date}</p>
            <p>{data.reviewerName}</p>
            <p>{data.reviewerEmail}</p>
            <p>{data.comment}</p>            
            <p>{data.rating}</p>
        </div>
    );
}

export { ProductDetail}
