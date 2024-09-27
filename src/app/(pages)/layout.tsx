import React from 'react'
import Navbar from '@/app/components/navigations/navbar'
import Footer from '../components/footer/footer'
import BannerF from '../components/banners/bannerF'

export default function CommonPageLayout({children}){
  return (
    <>
      <Navbar/>
      <div id="main-container" className='pt-10'>
        <BannerF/>        
        {children}
      </div>

      <Footer/>
    </>
  )
}
