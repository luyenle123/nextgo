'use client'

import * as constants from '@/app/constants'
import { Cart } from '@/app/components/cart/cart';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { GetUserName, IsLogin } from '@/app/services/userService';
import { SpeedInsights } from "@vercel/speed-insights/next"
import Link from 'next/link';

// import dynamic from 'next/dynamic';
// const WelcomeUser = dynamic(() => import('@/app/components/navigations/welcomeuser'), { ssr: false })

export default function Navbar(){
    const [isActive, setIsActive] = useState(false);
    const [username, setUserName] = useState('...');

    const route = useRouter();
    const pathname = usePathname();
    let currentPageName = 'Home Page';

    let isLogin = IsLogin();
    
    useEffect(() => {
        if(!isLogin){
            route.push('/' + constants.NAV_LOGIN);
        }
    }, [route, isLogin]);

    useEffect(() => {
        const uname = GetUserName();
        if(uname){
            setUserName(uname);
        }
        console.log('UserName: ' + uname);
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
        {url:'/' + constants.NAV_PRODUCT_LIST, text:'Products'},
        {url:'/' + constants.NAV_SEARCH, text:'Search'},
        {url:'/' + constants.NAV_CART_DETAIL, text:'Cart'},
        {url:'/' + constants.NAV_USER_LIST, text:'Users'},        
        {url:'/' + constants.NAV_POST_LIST, text:'Blog'},
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
                <NavbarList navs={navs} handleMenuClick={handleMenuClick} push={false} username = {username}/>
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
                        <NavbarList navs={navs} handleMenuClick={handleMenuClick} push={true} username = {username}/>
                    </div>
                : <></>}
            </div>

            <Cart/>
            <SpeedInsights/>
        </div>        
    </>
  )
}

export function NavbarList(props){
    return(
        <ul className="h-full w-full list-none">
            <li className="py-2 sm:py-1 float-left px-3 w-full cursor-pointer md:w-auto sm:flex-nowrap min-w-28 min-h-7 bg-white bg-opacity-30 mr-2">
                Hello  <span className='text-cyan-400 font-bold'>{props.username}</span>
                {/* <WelcomeUser/> */}
            </li>              
                     
            {props.navs.map((n, i) => (
                <li key={i} onClick={() => props.handleMenuClick(n, props.push)} className="py-2 sm:py-1 float-left px-3 w-full cursor-pointer md:w-auto sm:flex-nowrap sm:rounded border-sky-600 hover:bg-sky-700 active:bg-sky-900">
                    <Link href={n.url}>{n.text}</Link>
                </li>
            ))}
        </ul>
    );
}