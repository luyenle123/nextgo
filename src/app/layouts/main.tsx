import { LayoutProps } from '@/app/models/index'
import React from 'react'
import Navbar from '../components/navigations/navbar'
import Footer from '../components/footer/footer'

export function MainLayout({children}: LayoutProps){
  return (
    <>
      <Navbar/>
      <div id="main-container" className='pt-10'>
        {children}
      </div>
      <Footer/>  
    </>
  )
}
