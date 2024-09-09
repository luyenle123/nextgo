'use client'

import * as constants from '@/app/constants';
import { useEffect } from 'react';
import { LoaderToggle } from "@/app/components/loader/loader";
import { useRouter } from 'next/navigation';

import '@/app/styles/logout.css'

export default function Login(){
    const route = useRouter();

    useEffect(() => {
      try{
        LoaderToggle(true);
        localStorage.removeItem(constants.AUTH_NAME);
        setTimeout(() => {
          LoaderToggle(false);
          route.push('/' + constants.NAV_LOGIN); 
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
