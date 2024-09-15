'use client'

import Link from 'next/link';
import * as constants from '@/app/constants'
import { Cart } from '@/app/components/cart/cart';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { IsLogin } from '@/app/services/userService';

export default function Navbar(){
    const [isActive, setIsActive] = useState(false);
    //const [menuSelected, setmenuSelected] = useState('Home');

    const route = useRouter();
    const pathname = usePathname();
    let currentPageName = 'Home Page';

    let isLogin = IsLogin();
    
    useEffect(() => {
        if(!isLogin){
            route.push('/' + constants.NAV_LOGIN);
        }
    }, []);

    if(!isLogin){
        isLogin = IsLogin();
    }
    
    const segments = pathname.split('/');
    if(segments && segments.length > 1)
    {
        currentPageName = segments[1];
        if(currentPageName.length === 0)
            currentPageName = 'Home Page';
    }   

    //console.log('>> Navbar');

    const navs = [
        {url:'/' + constants.NAV_LOGOUT, text:'Logout'},
        {url:'/', text:'Home'},
        {url:'/' + constants.NAV_USER_LIST, text:'Users'},
        {url:'/' + constants.NAV_PRODUCT_LIST, text:'Products'},
        {url:'/' + constants.NAV_SEARCH, text:'Search'},
        {url:'/' + constants.NAV_CART_DETAIL, text:'Cart'},
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

    const handleMenuClick = (n, b) => {
        setIsActive(false);
        if(b){
            route.push(n.url);
        }        
    }

  return (
    <> 
        <div className="w-full h-10 bg-sky-800 fixed top-0 text-white nav-bar-zindex">
            <div className="hidden h-9 float-left my-1 px-1 w-full sm:hidden md:inline-block">
                <NavbarList navs={navs} handleMenuClick={handleMenuClick} push={false}/>
            </div>

            <div className='w-full line-block sm:inline-block md:hidden'>
                <div className='w-full'>
                    <div className='w-8 h-8 p-1 cursor-pointer float-left m-1 border rounded border-sky-600 border-solid' onClick={handleClick}>
                        <hr className='h-1 bg-gray-500 mt-0.5'/>
                        <hr className='h-1 bg-gray-500 mt-1'/>
                        <hr className='h-1 bg-gray-500 mt-1'/>
                    </div>

                    <div className='pl-3 mt-1.5 float-left text-lg'>
                        {currentPageName}
                    </div>
                </div>

                {isActive ? 
                    <div className='h-full w-full float-left bg-sky-800 py-2'>
                        <NavbarList navs={navs} handleMenuClick={handleMenuClick} push={true}/>
                    </div>
                : <></>}
            </div>

            <Cart/>
        </div>        
    </>
  )
}

export function NavbarList({navs, handleMenuClick, push}){
    return(
        <ul className="h-full w-full list-none">
            {navs.map((n, i) => (
                <li key={i} onClick={() => handleMenuClick(n, push)} className="py-2 sm:py-1 float-left px-3 w-full cursor-pointer md:w-auto sm:flex-nowrap sm:rounded border-sky-600 hover:bg-sky-700 active:bg-sky-900">
                    <Link href={n.url}>{n.text}</Link>
                </li>
            ))}
        </ul>
    );
}