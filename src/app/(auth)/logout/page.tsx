'use client'

import { useEffect } from 'react';
import { LoaderToggle } from "@/app/components/loader/loader";
import { useRouter } from 'next/navigation';

import { DeleteUserCookie, ValidateUser } from '@/app/services/userService';

export default function LogoutPage(){
    const route = useRouter();

    useEffect(() => {
      try{
        LoaderToggle(true);
        DeleteUserCookie();
        setTimeout(() => {
          LoaderToggle(false);
          ValidateUser(route);
        }, 1000);
      }catch (error) {
        route.push('/');
      }
    }, [route]);
  
    return (
      <>
          <div className='w-full h-full absolute m-0'>      
            <div className='fixed inset-0 w-1/2 h-28 m-auto border-solid rounded-xl text-gray-400 bg-gray-200'>
              <p className='leading-10 text-xl text-center mt-10'>LOGGING OUT</p>
            </div>
          </div>
      </>
    )
}
