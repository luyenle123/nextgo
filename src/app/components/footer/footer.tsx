import Image from 'next/image'
import React from 'react'

import visa from '@/app/images/visa.svg';
import amex from '@/app/images/amex.svg';
import mastercard from '@/app/images/mastercard.svg';
import paypal from '@/app/images/paypal.png';

import facebook from '@/app/images/facebook.svg';
import youtube from '@/app/images/youtube.svg';
import instagram from '@/app/images/instagram.svg';

export default function Footer(){
  return (
    <footer className="text-center inline-block w-full">
      <div className='w-full min-h-40 bg-slate-200'>
        <div className='text-left sm:flex w-fit float-left mt-2'>
          <div className='py-1 px-3 ml-2'>Supports</div>
          <div className='py-1 px-3 ml-2'>Guides</div>
          <div className='py-1 px-3 ml-2'>Blog</div>
          <div className='py-1 px-3 ml-2'>Video</div>
        </div>

        <div className='float-right mr-3 mt-3'>
          <div className='mb-4'>
            <div className='text-left uppercase'>Social Media</div>
            <div className='flex'>          
              <Image src={facebook} width={20} height={15} alt='facebook' className='mr-3'></Image>
              <Image src={youtube} width={30} height={40} alt='youtube' className='mr-3'></Image>
              <Image src={instagram} width={30} height={40} alt='instagram'></Image>
            </div>          
          </div>

          <div>
            <div className='text-left uppercase'>Secure payment methods</div>
            <div className='flex'>          
              <Image src={visa} width={50} height={30} alt='visa' className='mr-1'></Image>
              <Image src={amex} width={50} height={30} alt='visa' className='mr-1'></Image>
              <Image src={mastercard} width={50} height={30} alt='visa' className='mr-1'></Image>
              <Image src={paypal} width={50} height={30} alt='visa'></Image>
            </div>          
          </div>
        </div>

      </div>
    </footer>  
  )
}
