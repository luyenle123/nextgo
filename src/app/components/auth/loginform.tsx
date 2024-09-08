/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import React, { useEffect } from 'react'
import { toast } from 'react-toastify';
import { LoaderToggle } from "@/app/components/loader/loader";
import { useState} from 'react'
import { LoginAPI } from '@/app/services/userService';
import * as constants from '@/app/constants'
import { IResponseServiceModel } from "@/app/models/responseModel";

import '@/app/styles/login.css'
import { useRouter } from 'next/navigation';

const LoginForm = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const route = useRouter();
    const inputRef = React.useRef();

    useEffect(() => {
      if(localStorage.getItem(constants.AUTH_NAME)){
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
            localStorage.setItem(constants.AUTH_NAME, res.data.token);
            toast('Login successful.');
            route.push('/');
          }
        }
        else{
          toast('Error: ' + res.data);
        }

        LoaderToggle(false);
    };
  return (
    <div className='login-main'>
        <div className='login-container'>
          
            <div className='login-header'>Login</div>
            <div className='login-form'>

              <div className='item-block'>
                <input ref={inputRef} className='item-block-textbox' type='text' id='email' placeholder='user name' maxLength={100} onChange={emailChangeHandle}/>
              </div>

              <div className='item-block'>
                <input className='item-block-textbox' type='password' id='password' placeholder='password' maxLength={100} onChange={passwordChangeHandle}/>
              </div>

              <div className='item-block-2'>
                <label className="form-control">
                  <input type="checkbox" name="checkbox" />
                  <span className='form-control-label'>Remember</span>
                </label>
              </div>

              <div className='item-block'>
                <button className='login-button' onClick={handleloginClick}>Login</button>
              </div>              
                
            </div>
        </div>
    </div>
  )
}

export default LoginForm;