/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import React, { useEffect } from 'react'
import { toast } from 'react-toastify';
import { LoaderToggle } from "@/app/components/loader/loader";
import { useState} from 'react'
import { IsLogin, LoginAPI, SaveUser } from '@/app/services/userService';
import { IResponseServiceModel } from "@/app/models/responseModel";
// import {Checkbox} from "@nextui-org/checkbox";

import { useRouter } from 'next/navigation';

const LoginForm = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const route = useRouter();
    const inputRef = React.useRef();

    useEffect(() => {
      if(IsLogin()){
          route.push('/')
      }
    });

    useEffect(() => {
      if(inputRef && inputRef.current)
      {
        //inputRef.current.focus();      
      }
    }, []);
    
    const emailChangeHandle = (e) => {
      setEmail(e.target.value);
    }

    const passwordChangeHandle = (e) => {
      setPassword(e.target.value);
    }    

    const handleloginClick = async (e) => {
      if(!email || !password){
        toast('Input username and password');
        return;
      }      

      LoaderToggle(true);
      const res = await LoginAPI('emilys','emilyspass') as IResponseServiceModel;
      if(res.isSuccess)
      {
        if(res.data.token !== undefined){
          SaveUser(res.data.token);

          route.push('/');
        }
      }
      else{
        toast.error('Error: ' + res.data);
      }

      LoaderToggle(false);
    };
  return (
    <div className='bg-slate-100 m-0 top-0 w-full h-full absolute'>
        <div className='w-full fixed inset-0 sm:w-500 max-w-500 h-300 m-auto text-white border-solid sm:rounded-lg sm:border-4 border-gray-500 bg-slate-500'>
            <div className='text-center w-full mt-5 text-xl uppercase'>Login</div>
            <div className='p-5'>

              <div className='p-1'>
                <input ref={inputRef} className='w-full h-8 rounded-3xl p-5 bg-gray-100 bg-opacity-10 border-solid border-2 border-gray-400 focus:border-gray-200 focus:outline-none' type='text' id='email' placeholder='user name' maxLength={100} onChange={emailChangeHandle}/>
              </div>

              <div className='p-1'>
                <input className='w-full h-8 rounded-3xl p-5 bg-gray-100 bg-opacity-10 border-solid border-2 border-gray-400 focus:border-gray-200 focus:outline-none' type='password' id='password' placeholder='password' maxLength={100} onChange={passwordChangeHandle}/>
              </div>

              <div className='p-3'>
                <label className='flex'>
                {/* <Checkbox>Remember</Checkbox> */}
                  <input type="checkbox" name="checkbox" autoFocus className='outline-none w-5 h-5'/> 
                  <span className='ml-2'>Remember</span>
                </label>
              </div>

              <div className='p-1'>
                <button className='w-full p-3 bg-gray-400 hover:bg-gray-500 active:bg-gray-400 rounded-3xl font-bold' onClick={handleloginClick}>Login</button>
              </div>              
                
            </div>
        </div>
    </div>
  )
}

export default LoginForm;