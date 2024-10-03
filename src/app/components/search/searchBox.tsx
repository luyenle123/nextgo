import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import searchIcon from '@/app/images/search-icon-100.png';

export default function SearchBox({handleSearch, type = 1, text = null}){
    const [key, setKey] = useState('');

    useEffect(() => {
        if(text && text.length >= 3)
        {
            setKey(text);
        }        
    }, [text]);     

    const handleSearchClick = async () => {
        if (key && key.length >= 3) {
            handleSearch(key);
        }
    }    

    const handleKeyDown = async (event) => {
        if (event.key === 'Enter' && key && key.length >= 3) {
            handleSearch(key);
        }
    }

    const handleOnChange = (value) => {
        setKey(value);
    }
    
    const cl = type === 1 ? 'px-10 py-12' : 'px-10 py-12';


  return (
    <div className='w-full sm:w-3/4 md:search-form-width lg:search-form-width xl:search-form-width 2xl:search-form-width max-w-2xl mt-0 mx-auto bg-slate-100 border-gray-400 shadow-[5px_5px_5px_-3px_rgba(0,0,0,0.25)]'>
        <div className='uppercase text-center py-2 text-2xl text-gray-400 border-b border-solid border-gray-300'>
            Search product
        </div>
        <div className={'flex ' + cl}>
            <input className='h-10 w-full rounded-l text-lg pl-2 outline-none placeholder:text-gray-300' value={key} placeholder='kitchen, drink, iphone ...' maxLength={50} autoFocus onChange={(e) => handleOnChange(e.target.value)} onKeyDown={handleKeyDown}></input>
            <button className='h-10 w-16 bg-gray-200 border-l rounded-r font-bold hover:bg-gray-300 active:bg-gray-200' onClick={handleSearchClick} onKeyDown={handleKeyDown}>
                <Image src={searchIcon} width={30} height={30} alt='search' className='my-0 mx-auto opacity-50'></Image>
            </button>
        </div>
    </div>
  )
}
