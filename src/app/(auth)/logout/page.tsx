'use client'

import { useEffect } from 'react';
import { LoaderToggle } from "@/app/components/loader/loader";
import { useRouter } from 'next/navigation';

import '@/app/styles/logout.css'
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
    }, []);
  
    return (
      <>
          <div className='logout-main'>      
            <div className='logout-container'>
              <p>LOGGING OUT</p>
            </div>
          </div>
      </>
    )
}
