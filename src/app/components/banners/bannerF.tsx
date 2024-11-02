'use client'

import React from 'react'
// import { isMobile } from 'react-device-detect';
import Image from 'next/image';

export default function BannerF(){
    // const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const banners = [
      {title:'GO GO NEXT', body:"Welcome to the Next.js App Router course! In this free interactive course, you'll learn the main features of Next.js by building a full-stack web application.", image: '/images/banners/hero_banner.avif'},
      {title:'GO GO NEXT 2', body:'The React Framework for the Web. Used by some of the worlds largest companies, Next.js enables you to create high-quality web applications with the power of React components.', image: '/images/banners/banner_002_400.jpg'},
      {title:'GO GO NEXT 3', body:'The React Framework for the Web. Used by some of the worlds largest companies, Next.js enables you to create high-quality web applications with the power of React components.', image: '/images/banners/banner_003_400.jpg'},
      {title:'GO GO NEXT 4', body:'The React Framework for the Web. Used by some of the worlds largest companies, Next.js enables you to create high-quality web applications with the power of React components.', image: '/images/banners/banner_004_400.jpg'}     
    ]   

    // if(isMobile){
    //   banners = [
    //     {title:'GO GO NEXT 1', body:"Welcome to the Next.js App Router course! In this free interactive course, you'll learn the main features of Next.js by building a full-stack web application.", image: '/images/banners/mobile/hero_banner.avif'},
    //     {title:'GO GO NEXT 2', body:'The React Framework for the Web. Used by some of the worlds largest companies, Next.js enables you to create high-quality web applications with the power of React components.', image: '/images/banners/banner_002_400_m.jpg'},
    //     {title:'GO GO NEXT 3', body:'The React Framework for the Web. Used by some of the worlds largest companies, Next.js enables you to create high-quality web applications with the power of React components.', image: '/images/banners/banner_003_400_m.jpg'},
    //     {title:'GO GO NEXT 4', body:'The React Framework for the Web. Used by some of the worlds largest companies, Next.js enables you to create high-quality web applications with the power of React components.', image: '/images/banners/banner_004_400_m.jpg'}     
    //   ]
    // }

    // useEffect(() => {
    //   // Set up an interval to change the image every 10 seconds
    //   const intervalId = setInterval(() => {
    //     setCurrentImageIndex(prevIndex => 
    //       (prevIndex + 1) % banners.length
    //     );
    //   }, 10000); // 10000 milliseconds = 10 seconds
  
    //   // Cleanup the interval on component unmount
    //   return () => clearInterval(intervalId);
    // }, [banners.length]);


    const banner = banners[0];

  return (
    <div className='relative w-full h-400 bg-slate-50 md overflow-hidden'>

      {/* {bannerImages.map((image, index) => (
        <Image 
          priority 
          key={index}
          src={image}
          alt={`Banner ${index + 1}`}
          width={1920}
          height={400}
          style={{
            position: 'absolute',
            width:'auto',
            height: 'auto',
            opacity: currentImageIndex === index ? 1 : 0,
            transition: 'opacity 1s ease-in-out'
          }} 
        />
      ))} */}

    {/* {banners.map((b, index) => (
        <div key={index}  style={{
          opacity: currentImageIndex === index ? 1 : 0,
          transition: 'opacity 1s ease-in-out'
        }}>
          <Image 
            priority 
            src={b.image}
            alt={b.title}
            width={1920}
            height={400}
            style={{
              position: 'absolute',
              width:'auto',
              height: 'auto',
            }} 
          />
          <div className='w-full md:w-500 absolute top-1/4 md:left-5p text-white bg-gray-700 bg-opacity-30 p-5'>
              <div className='font-bold text-3xl'>
                  {b.title}
              </div>

              <div className='mt-5 text-xl'>
                {b.body}
              </div>
          </div>
        </div>
      ))} */}

        <div >
            <div className='overflow-hidden justify-center'>
              <Image alt="banner.title" src={banner.image} quality={100} fill sizes="100vw" style={{ objectFit: 'cover', }}/>
            </div>
          
          <div className='w-full md:w-500 absolute top-20 md:left-5p text-white bg-gray-700 bg-opacity-30 p-5'>
              <div className='font-bold text-3xl'>
                  {banner.title}
              </div>

              <div className='mt-5 text-xl'>
                {banner.body}
              </div>
          </div>
        </div>    

    </div>
  )
}

export async function getServerSideProps({ req }) {
    const userAgent = req.headers['user-agent'];
    const isMobile = /iPhone|iPad|Android/i.test(userAgent);
  
    return {
      props: {
        isMobile, // Pass the mobile detection result to the component
      },
    };
  }