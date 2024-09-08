import type { Metadata } from "next";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';

// import TopNav from "@/app/components/navigations/topnav";
import { Loader } from "@/app/components/loader/loader";
import { ToastContainer } from "react-toastify";
// import { IsLogin } from '@/app/services/userService';
import Link from 'next/link';
import * as constants from '@/app/constants'
import { Cart } from '@/app/components/cart/cart';


export const metadata: Metadata = {
  title: "GO GO NEXT",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const isLogin = true;
 
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
    <html lang="en">
      <body>
        <ToastContainer autoClose={1000}/>        
          
        <div className="w-full h-10 bg-sky-800 fixed top-0 text-white z-50">
            <ul className="list-none float-left overflow-hidden my-1 px-1">
                {!isLogin && <li> 
                    <Link href={'/' + constants.NAV_LOGIN}>Login</Link> 
                </li>}

                {isLogin && 
                    <>
                        {navs.map((n, i) => (
                            <li key={i} className="float-left py-1 px-3 rounded border-solid border-sky-600 hover:bg-sky-700 active:bg-sky-900">
                                <Link href={n.url}>{n.text}</Link>
                            </li>
                        ))}
                    </>
                }
            </ul> 
            <Cart/>            
          </div>          

          <div id="main-container" className='pt-10'>
            <Loader isActive={false}/>
            {children}
          </div>
          <footer className="text-center min-h-40 bg-gray-200">
            <p className="leading-10">Footer</p>
          </footer>     
      </body>
    </html>
  );
}
