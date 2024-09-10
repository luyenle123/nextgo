import React from 'react'
import Navbar from '@/app/components/navigations/navbar'

export default function CommonPageLayout({children}){
  return (
    <>
      <Navbar/>
      <div id="main-container" className='pt-10'>
        {children}
      </div>
      <footer className="text-center h-40 bg-gray-200 inline-block w-full">
        <p className="leading-10">Footer</p>
      </footer>     
    </>
  )
}
