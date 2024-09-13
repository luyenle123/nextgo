import Image from 'next/image'
import React from 'react'

import visa from '@/app/images/visa.svg';
import amex from '@/app/images/amex.svg';
import mastercard from '@/app/images/mastercard.svg';
import paypal from '@/app/images/paypal.png';

export default function Footer(){
  return (
    <footer className="text-center h-40 inline-block w-full">
        <div className='flex w-full'>
          <div className='w-1/2 h-36 mx-1 bg-slate-200 hidden sm:block'>
          </div>
          <div className='w-full sm:w-1/2 h-36 mx-1 bg-slate-200'>
            <div className='flex float-right mt-3 mr-3'>
              <Image src={visa} width={50} height={30} alt='visa' className='mr-1'></Image>
              <Image src={amex} width={50} height={30} alt='visa' className='mr-1'></Image>
              <Image src={mastercard} width={50} height={30} alt='visa' className='mr-1'></Image>
              <Image src={paypal} width={50} height={30} alt='visa'></Image>
            </div>          
          </div>           
        </div>
    </footer>  
  )
}
