'use client'
import React, { useState } from 'react'
import { toast } from 'react-toastify';

export default function ContactUsForm(){
    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
      }
    
      const handleSubmit = (event) => {
        event.preventDefault();
        toast('Send completed.');

        console.log(JSON.stringify(inputs));
      }    

  return (
    <div className='w-full mt-10 mb-10'>
        <div className='text-center uppercase text-3xl mt-5'>
            Contact Us
        </div>

        <div className='w-full px-2 lg:w-116 mx-auto mt-10'>
            <form onSubmit={handleSubmit}>
                <div className='w-full my-3'>
                    <input className='form-control-input' type='text' name='enquiry' placeholder='Enquiry' onChange={() => handleChange}></input>
                </div>
                <div className='w-full my-3 md:flex'>
                    <div className='float-left w-full md:w-1/2 mr-2'>
                        <input className='form-control-input' type='text' name='firstname' placeholder='First name' onChange={() => handleChange}></input>
                    </div>
                    <div className='float-right w-full md:w-1/2 ml-2 mt-3 md:mt-0'>
                        <input className='form-control-input' type='text' name='lastname' placeholder='Last name' onChange={() => handleChange}></input>
                    </div>
                </div>

                <div className='w-full my-3 md:flex'>
                    <div className='float-left w-full md:w-1/2 mr-2 mt-3 md:mt-0'>
                        <input className='form-control-input' type='text' name='email' placeholder='Email' onChange={() => handleChange}></input>
                    </div>
                    <div className='float-right w-full md:w-1/2 ml-2 mt-3 md:mt-0'>
                        <input className='form-control-input' type='text' name='contactnumber' placeholder='Contact number' onChange={() => handleChange}></input>
                    </div>
                </div>

                <div className='w-full my-3'>
                    <textarea className='form-control-input h-40 mt-3 md:mt-0' name='message' onChange={() => handleChange} placeholder='Message'></textarea>
                </div>

                <div className='w-full my-3'>
                    <label className='flex'>
                        <input className='w-5 h-5 m-0' type="checkbox" name="chk1"/> 
                        <span className='ml-2'>By continuing, you agree to GO GO</span>
                    </label>
                </div>

                <div className='w-full my-3'>
                    <label className='flex'>
                        <input className='w-5 h-5 m-0' type="checkbox" name="chk1"/> 
                        <span className='ml-2'>Agree with GO GO</span>
                    </label>
                </div>

                <div className='w-full my-3 mt-10'>
                    <div className='w-full text-center'>
                        <button className='py-3 w-60 font-bold bg-gray-200 hover:bg-gray-100 active:bg-gray-200'>SEND</button>
                    </div>
                </div>                

            </form>
        </div>
    </div>
  )
}
