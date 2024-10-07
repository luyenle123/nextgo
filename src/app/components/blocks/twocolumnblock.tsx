import Image from 'next/image';
import React from 'react'

export default function Twocolumnblock(props){
  const defaultImage1 = "/images/blocks/image_2col_01.jpg";
  const defaultImage2 = "/images/blocks/image_2col_02.jpg";

  let image1 = defaultImage1;
  let image2 = defaultImage2;

  if(props.image1){
    image1 = props.image1;
  }
  if(props.image2){
    image2 = props.image2;
  }

  return (
    <div className='w-full flex'>
        <div className='w-1/2 p-2'>
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
        <div className='w-1/2 p-2'>
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
    </div>
  )
}
