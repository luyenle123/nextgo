"use client"

import { useRouter } from 'next/navigation';
import React from 'react'

export const ButtonRedirect = () => {
    const router = useRouter();

    const handleClick =  () => {
      router.push('/login');
    }    
  return (
    <button onClick={handleClick} className='mt-5 text-green-800 font-bold hover:underline'>Go To Login Page</button>
  )
}
