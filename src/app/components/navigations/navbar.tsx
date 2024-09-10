'use client'

import Link from 'next/link';
import * as constants from '@/app/constants'
import { Cart } from '@/app/components/cart/cart';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { IsLogin } from '@/app/services/userService';

export default function Navbar(){
    const route = useRouter();
    let isLogin = IsLogin();

    useEffect(() => {
        if(!isLogin){
            route.push('/' + constants.NAV_LOGIN);
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

  return (
    <> 
        <div className="w-full h-10 bg-sky-800 fixed top-0 text-white z-50">
            <ul className="list-none float-left overflow-hidden my-1 px-1">
                {navs.map((n, i) => (
                    <li key={i} className="float-left py-1 px-3 rounded border-solid border-sky-600 hover:bg-sky-700 active:bg-sky-900">
                        <Link href={n.url}>{n.text}</Link>
                    </li>
                ))}
            </ul>

            <Cart/>            
        </div>        
    </>
  )
}