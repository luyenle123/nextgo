import { LayoutProps } from '@/app/models/index'
import React from 'react'
import Navbar from '../components/navigations/navbar'
import Footer from '../components/footer/footer'
import BannerF from '../components/banners/bannerF'

export function MainLayout({children}: LayoutProps){
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
