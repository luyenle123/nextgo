import { LayoutProps } from '@/app/models/index'
import React from 'react'
import Navbar from '../components/navigations/navbar'

export function MainLayout({children}: LayoutProps){
  return (
    <>
      <Navbar/>
      <div id="main-container" className='pt-10'>
        {children}
      </div>
      <footer className="text-center min-h-40 bg-gray-200">
        <p className="leading-10">Footer</p>
      </footer>     
    </>
  )
}
