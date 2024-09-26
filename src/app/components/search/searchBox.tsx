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

    const handleSearchClick = async (event) => {
        if (event.key === 'Enter' && key && key.length >= 3) {
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
    
    const cl = type === 1 ? 'p-7' : 'p-10';
  return (
    <div className='w-full sm:w-3/4 md:search-form-width lg:search-form-width xl:search-form-width 2xl:search-form-width max-w-2xl mt-0 mx-auto bg-gray-200 sm:rounded border-gray-400'>
        <div className={'flex ' + cl}>
            <input className='h-10 w-full rounded-l text-lg pl-2 outline-none' value={key} placeholder='search product' maxLength={50} autoFocus onChange={(e) => handleOnChange(e.target.value)} onKeyDown={handleKeyDown}></input>
            <button className='h-10 w-12 bg-gray-100 border-l rounded-r font-bold hover:bg-gray-400 active:bg-gray-300' onClick={handleSearchClick} onKeyDown={handleKeyDown}>
            <Image src={searchIcon} width={30} height={30} alt='search' className='my-0 mx-auto opacity-50'></Image>
            </button>
        </div>
    </div>
  )
}
