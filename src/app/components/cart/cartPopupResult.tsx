/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import ProductRating from '../products/productRating';
import { ContinueAndViewCartButtonCenter} from '../buttons/commonButton';

export default function CartPopupResult({product, handleCallback}){
  const [isdisplay, setIsDisplay] = useState(true);

  const route = useRouter();

  if(!isdisplay || !product){
    return(<></>);
  }  

  const hide = () =>{
    setIsDisplay(false);
    handleCallback();
  }
  
  const viewCartHandleClick = () =>{    
    route.push('/cart');
  }

  const FadeIn = () => {
    try{
      const bgElement = document.getElementById('popup-result');
      if(!bgElement){
        console.log('element null');
        return;
      }

      let opacity = 0;
      const fadeEffect = setInterval(function () {
        if (opacity < 1) {
          opacity += 0.02;
        } else {
            clearInterval(fadeEffect);
        }
        bgElement.style.opacity = opacity + '';
      }, 1);
    }
    catch(err){
      console.log(err);
    }
  } 

    if(isdisplay){
      setTimeout(function(){FadeIn()}, 100);
    }    

  return(
    <>
      <div id='popup-result' className=' w-full h-full fixed left-0 top-0 z-50 '  style={{ opacity: '0' }} onClick={hide}>
          <div id="popup-result-bg" className='w-full h-full bg-gray-500 bg-opacity-40'></div>
          <div className='fixed inset-0 w-full max-w-500 h-350 m-auto'>
              <div className='w-full h-350 bg-white'>
                <div className='text-center mb-2 text-sm py-4 font-bold text-green-600'>
                  <p>Add item to cart successful</p>
                </div>

                <div className='px-2 text-sm'>
                  <Image className='float-left' src={product.thumbnail} alt={product.title} width={150} height={150}></Image>
                  <div className='ml-2'>
                    <p className='font-bold'>{product?.sku}</p>
                    <p className='font-bold'>{product?.title}</p>
                    <p>{product?.description}</p>
                    <p className='font-bold text-right mt-2'>{product?.price} $</p>
                    <ProductRating rating={product.rating}/>
                  </div>
                </div>

                <div className='bottom-0 absolute mb-4 w-full'>
                  <ContinueAndViewCartButtonCenter continueHandleClick={hide} viewCarthandleClick={viewCartHandleClick}/>
                </div>
              </div>
          </div>
      </div>
    </>
  );
}

