/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import ProductRating from './productRating';

export default function ProductCard({product, handleAddToCartClick}){
    return(
      <>      
          <div className="productcard-min-h bg-gray-500 bg-opacity-10 m-1 p-2">
            <div className="w-fit mx-auto my-0">
              <Link href={'/products/'+product .id} className="font-bold">
                <Image src={product.thumbnail} alt={product .title} width={200} height={200} priority/>  
              </Link>
            </div>
  
            <Link href={'/products/'+ product .id} className="font-bold">
              {product .sku}
            </Link>
  
            <p>{product .title}</p>
            <p>{product .description}</p>
            <p>{product .category}</p>
  
            <p className="text-right">Instock({product .stock})</p>
            <p className="text-right font-bold text-lg">{product .price} $</p>
  
            <ProductRating rating={product.rating}/>
  
            <div className="absolute bottom-0 mb-3">
              <button onClick={() => handleAddToCartClick(product )} className="py-2 px-4 text-emerald-800 font-bold bg-slate-300 hover:bg-slate-400 active:bg-slate-300">Add To Cart</button>
            </div>
          </div>
      </>
    );
  }
