'use client'

import React, { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect';
import Image from 'next/image';

import bannerImg1 from '@/app/images/banners/banner_001_400.jpg';
import bannerImg2 from '@/app/images/banners/banner_002_400.jpg';
import bannerImg3 from '@/app/images/banners/banner_003_400.jpg';
import bannerImg4 from '@/app/images/banners/banner_004_400.jpg';

import bannerImg1m from '@/app/images/banners/mobile/banner_001_400_m.jpg';
import bannerImg2m from '@/app/images/banners/mobile/banner_002_400_m.jpg';
import bannerImg3m from '@/app/images/banners/mobile/banner_003_400_m.jpg';
import bannerImg4m from '@/app/images/banners/mobile/banner_004_400_m.jpg';

// import styles from '@/app/styles/ResponsiveBanner.module.css';

export default function BannerF(){
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    let bannerImages = [
        bannerImg1,
        bannerImg2,
        bannerImg3,
        bannerImg4
      ];

    if(isMobile){
      console.log('MOBILE');
        bannerImages = [
            bannerImg1m,
            bannerImg2m,
            bannerImg3m,
            bannerImg4m
          ];
    }

      useEffect(() => {
        // Set up an interval to change the image every 10 seconds
        const intervalId = setInterval(() => {
          setCurrentImageIndex(prevIndex => 
            (prevIndex + 1) % bannerImages.length
          );
        }, 10000); // 10000 milliseconds = 10 seconds
    
        // Cleanup the interval on component unmount
        return () => clearInterval(intervalId);
      }, []);

  return (
    <div className='relative w-full h-400 bg-slate-50 md overflow-hidden'>

      {bannerImages.map((image, index) => (
        <Image 
          key={index}
          src={image}
          alt={`Banner ${index + 1}`}
          style={{
            position: 'absolute',
            width:'100%',
            height: '100%',
            opacity: currentImageIndex === index ? 1 : 0,
            transition: 'opacity 1s ease-in-out'
          }} 
        />
      ))}
      
        <div className='w-full md:w-500 absolute top-1/4 md:left-5p text-white bg-gray-700 bg-opacity-40 p-5'>
            <div className='font-bold text-3xl'>
                GO GO NEXT
            </div>

            <div className='mt-5 text-xl'>
                <strong>The React Framework for the Web.</strong> Used by some of the worlds largest companies, Next.js enables you to create high-quality web applications with the power of React components.
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