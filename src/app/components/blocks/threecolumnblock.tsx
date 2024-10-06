import Image from 'next/image';
import React from 'react'

export default function Threecolumnblock(){
  const image1 = "/images/blocks/image_3col_01.jpg";
  const image2 = "/images/blocks/image_3col_02.jpg";
  const image3 = "/images/blocks/image_3col_03.jpg";  
  return (
    <div className='w-full flex'>
        <div className='w-1/3 p-2'>
            <div className='w-full h-100 bg-slate-200 rounded-md bg-opacity-20'>
            <Image src={image1} width={0} height={0} alt='image'
              sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              100vw"
              style={{
                maxWidth: 'none',
                height: '100%', width: '100%'
              }}></Image>
            </div>
        </div>
        <div className='w-1/3 p-2'>
            <div className='w-full h-100 bg-slate-200 rounded-md bg-opacity-20'>
              <Image src={image2} width={0} height={0} alt='image'
                sizes="(max-width: 768px) 100vw,
                (max-width: 1200px) 50vw,
                100vw"
                style={{
                  maxWidth: 'none',
                  height: '100%', width: '100%'
                }}></Image>
            </div>
        </div>
        <div className='w-1/3 p-2'>
            <div className='w-full h-100 bg-slate-200 rounded-md bg-opacity-20'>
              <Image src={image3} width={0} height={0} alt='image'
                sizes="(max-width: 768px) 100vw,
                (max-width: 1200px) 50vw,
                100vw"
                style={{
                  maxWidth: 'none',
                  height: '100%', width: '100%'
                }}></Image>
            </div>
        </div>        
    </div>
  )
}
