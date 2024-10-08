/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'
import ProductRating from './productRating';
import CartPopupResult from '../cart/cartPopupResult';
import { IProductItem } from '@/app/models/productmodel';
import { LoaderToggle } from '../loader/loader';
import { DoAddToCart, UpdateCartInfo } from '../cart/cart';
import { AddToCartButton } from '../buttons/commonButton';

const ProductCard = (props) => {
  const [cartProduct, setCartProduct] = useState<IProductItem | undefined>(undefined);

  const product = props.product;
  const outOfStockColor = product.stock === 0 ? 'text-red-600' : '';
  const stock = props.product.stock === 0 ? 'OutStock' : `Instock(${product.stock})`;


  const handleAddToCart = (product) => {
    LoaderToggle(true);
    DoAddToCart(product, (sucess:boolean) => {
      if(sucess){
        LoaderToggle(false, () => {
          setTimeout(function(){setCartProduct(product)}, 100);
        });
        UpdateCartInfo(null, 1);
      }else{
        LoaderToggle(false);
      }
    });
  };

    return(
      <>      
          <div className="productcard-min-h bg-slate-100 bg-opacity-40 m-1 p-2">
            <div className="w-48 2xl mx-auto my-0">
              <Link href={'/products/'+product.id} className="font-bold">
                <Image src={product.thumbnail} alt={product.title} width={192} height={192} priority/>  
              </Link>
            </div>
  
            <Link href={'/products/'+ product.id} className="font-bold">
              {product .sku}
            </Link>
  
            <p>{product.title}</p>
            <p>{product.description}</p>
            <p>{product.category}</p>
  
            <p className={'text-right ' + outOfStockColor}>{stock}</p>
            <p className="text-right font-bold text-lg">{product.price} $</p>
  
            <ProductRating rating={product.rating}/>
  
            <div className="absolute bottom-0 mb-3">
              <AddToCartButton handleAddToCartClick={handleAddToCart} product={product}/>
            </div>
          </div>

          { cartProduct && <CartPopupResult product={cartProduct} handleCallback={() => { setCartProduct(undefined)}}/> }          
      </>
    );
  }

  const ProductCardEmpty = () => {
    return(
      <>      
          <div className="productcard-min-h bg-gray-400 bg-opacity-30 m-1 p-2 text-gray-400 blur-sm">
            <div className="w-48 h-48 mx-auto my-0 bg-gray-400 bg-opacity-20">

            </div>
  
            <p className="font-bold"> Z1L68SM</p>
  
            <p>product.title</p>
            <p>product.description</p>
            <p>product.category</p>
  
            <p className="text-right">Instock(0)</p>
            <p className="text-right font-bold text-lg">0.00 $</p>
  
            <ProductRating rating={0}/>
  
            <div className="absolute bottom-0 mb-3 opacity-50">
              <button className="py-2 px-4 text-emerald-800 font-bold bg-slate-300 hover:bg-slate-400 active:bg-slate-300">Add To Cart</button>
            </div>
          </div>
      </>
    );
  }  

  export { ProductCard, ProductCardEmpty }