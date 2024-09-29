'use client'

import React from 'react'
import { GetUserName } from '@/app/services/userService';

export default function WelcomeUser() {
  const username = GetUserName();
  return (
    <>
        <span className='text-cyan-400 font-bold'>{username}</span>
    </>  
  )
}
