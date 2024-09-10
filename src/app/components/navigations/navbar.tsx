'use client'

import Link from 'next/link';
import * as constants from '@/app/constants'
import { Cart } from '@/app/components/cart/cart';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { IsLogin } from '@/app/services/userService';

export default function Navbar(){
    const [isActive, setIsActive] = useState(false);
    const [menuSelected, setmenuSelected] = useState('Home');

    const route = useRouter();
    let isLogin = IsLogin();
    const pathname = usePathname();

    useEffect(() => {
        if(!isLogin){
            route.push('/' + constants.NAV_LOGIN);
        }

        const segments = pathname.split('/');
        if(segments && segments.length > 1)
        {
            const page = segments[1];
            setmenuSelected(page);
        }        
    }, []);

    if(!isLogin){
        isLogin = IsLogin();
    }    

    // console.log('>> TOPNAV> Login: ' + isLogin + ' / ' + IsLogin());

    const navs = [
        {url:'/' + constants.NAV_LOGOUT, text:'Logout'},
        {url:'/', text:'Home'},
        {url:'/' + constants.NAV_USER_LIST, text:'Users'},
        {url:'/' + constants.NAV_PRODUCT_LIST, text:'Products'},
        {url:'/' + constants.NAV_SEARCH, text:'Search'},
        {url:'/' + constants.NAV_CART_DETAIL, text:'Cart Detail'},
        {url:'/' + constants.NAV_POST_LIST, text:'Posts'},
    ];

   
    const handleClick = () => {
        if(!isActive)
        {
            setIsActive(true);
        }
        else{
            setIsActive(false);
        }
    }

    const handleMenuClick = (n) => {
        setmenuSelected(n.text);
        setIsActive(false);
        route.push(n.url);
    }

  return (
    <> 
        <div className="w-full h-10 bg-sky-800 fixed top-0 text-white z-50">
            <ul className="hidden list-none h-9 float-left my-1 px-1 sm:hidden md:inline-block">
                {navs.map((n, i) => (
                    <li key={i} className="float-left py-1 px-3 flex-nowrap rounded border-solid border-sky-600 hover:bg-sky-700 active:bg-sky-900">
                        <Link href={n.url}>{n.text}</Link>
                    </li>
                ))}
            </ul>


            <div className='nline-block sm:inline-block md:hidden'>

                <div className='w-full'>
                    <div className='w-8 h-9 pl-1 cursor-pointer float-left' onClick={handleClick}>
                        <hr className='h-1 bg-gray-500 mt-3'/>
                        <hr className='h-1 bg-gray-500 mt-1'/>
                        <hr className='h-1 bg-gray-500 mt-1'/>
                    </div>

                    <div className='pl-3 mt-3 float-left'>
                        {menuSelected}
                    </div>
                </div>
                
                {isActive ? 
                    <>
                        <ul className="h-full w-full float-left my-1  bg-sky-600">
                            {navs.map((n, i) => (
                                <li key={i} className="float-left py-1 w-full border-sky-600 hover:bg-sky-700 active:bg-sky-900">
                                    <p className='pl-2 cursor-pointer' onClick={() => handleMenuClick(n)}>{n.text}</p>
                                </li>
                            ))}
                        </ul>
                    </>
                 : <></>}                    
            </div>

            <Cart/>            
        </div>        
    </>
  )
}