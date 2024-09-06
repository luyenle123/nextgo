"use client"

import { useRouter } from 'next/navigation';
import React from 'react'

export const ButtonRedirect = () => {
    const router = useRouter();

    const handleClick =  () => {
      router.push('/login');
    }    
  return (
    <button onClick={handleClick}>Go To Login Page</button>
  )
}
