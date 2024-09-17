'use client'

import { useEffect, useState } from 'react';
import { GetProductDetail } from "@/app/services/productService";
import { IResponseServiceModel } from "@/app/models/responseModel";
import { IProductItem } from '@/app/models/productmodel';
import Image from 'next/image';
import { LoaderToggle } from "@/app/components/loader/loader";
import { toast } from 'react-toastify';

const ProductDetail = ({id}) => {
    const [product, setProduct] = useState<IProductItem | undefined>(undefined);

    useEffect(() => {
        async function queryData() {
            const res = await GetProductDetail(id) as IResponseServiceModel;
            if(res.isSuccess)
            {
                setProduct(res.data);
            }
            else{
                toast.error('Error: ' + res.data);
            }
        }

        LoaderToggle(true);
        queryData();
    }, [id]);

    if(!product){
        return(
            <div className='min-h-svh'>
                <p>Loading...</p>
            </div>
        );
    }

    if(!product){
        return(
            <div className='min-h-svh'>
                {/* <p>NOT FOUND</p> */}
            </div>
        );
    }

    return(
        <>
            <div className="w-full lg:w-2/3 m-0 mx-auto mb-3">
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
