/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import React, { useState } from 'react'
import { Fetcher, GetCategoryListUrl } from "@/app/services/productAPI";
import useSWR from 'swr'
import ProductRating from './productRating';

export function Hello() {
    return <p>Hello!</p>
  }

export default function Filter(props){
    const [categorySelected, setCategorySelected] = useState(props.category);
    const categoryEmptyList = ['','','','','','','','','','','','','','','','','','','','','','','',''];

    const { data, error, isLoading } = useSWR(GetCategoryListUrl(), Fetcher(), {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
      });      

    const categories = data;

    if(error){
        console.log(error);
    }

    const handleCategoryClick = (p) => {
        if(p === categorySelected) return;
        setCategorySelected(p);
        props.handleClick(p)
    }

    const handleClearClick = () => {
        setCategorySelected(undefined);
        props.handleClick()
    }

    const blurclass = categories && categories.length > 0 ? '' : ' blur-sm opacity-70';
  return (
    <div className={'lg:h-full px-1 sm:px-2 mb-2 lg:mb-0' + blurclass}> 
        <div className='text-base uppercase text-center '>Filter</div>

        <div className='my-1 h-8 p-1 font-bold border-gray-100 border-solid border'>
            {categorySelected ? <>
                    {categorySelected} (<span id='category-product-count'>{props.productCount?props.productCount : 0}</span>) 
                    <span className='float-right text-sm mr-2 text-red-500 cursor-pointer' onClick={() => handleClearClick()}>X</span>
                </> 
                : <>
                    <span className='text-gray-200 font-normal'>No category selected</span>
                </>
            }
        </div>

        <div className='font-bold'>
                Category
        </div>

        <div className='h-28 pl-2 overflow-x-auto w-full lg:h-auto border sm:border-0 border-gray-100'>
            {!isLoading ?                     
                <>
                    {categories.map((p, i) => ( <MapItem key = {i} category = {p} categoryHandleClick = {handleCategoryClick} categorySelected={categorySelected}/> ))}
                </>                 
                :
                <>
                    {categoryEmptyList.map((p, i) => ( <MapEmptyItem key = {i} category = {p}/> ))}
                </>
            }
        </div>

        <div className='mt-5 text-gray-400'>
            <div className='font-bold'>
                Price
            </div>
            <div className='pl-2 cursor-pointer'>
                <select className='w-full h-8 border border-gray-100 outline-none'>
                    <option key={1} value={1}>0 - $5</option>
                    <option key={2} value={2}>$6 - $10</option>
                    <option key={3} value={3}>$11 - $20</option>
                    <option key={4} value={4}>$21 - $50</option>
                    <option key={5} value={5}>$51 - $100</option>
                    <option key={6} value={6}>$101 - $500</option>
                    <option key={7} value={7}>$501 - $1000</option>
                    <option key={8} value={8}>$1001 - $5000</option>
                    <option key={9} value={9}>$5001 - $10.000</option>
                    <option key={10} value={10}> &gt; $10.000</option>
                </select>
            </div>
        </div>        

        <div className='mt-5 text-gray-400'>
            <div className='font-bold'>
                Sales
            </div>
            <div className='pl-2 cursor-pointer'>
                <div className='py-0.5'>No Sales</div>
                <div className='py-0.5'>Low</div>
                <div className='py-0.5'>Medium</div>
                <div className='py-0.5'>High</div>
                <div className='py-0.5'>Top Sellers</div>
            </div>
        </div>

        <div className='mt-5 text-gray-400'>
            <div className='font-bold'>
                Rating
            </div>
            <div className='pl-2 cursor-pointer'>
                <div className='py-0.5'>1 star <span className='opacity-40'><ProductRating rating={1}/></span></div>
                <div className='py-0.5'>2 star <span className='opacity-40'><ProductRating rating={2}/></span></div>
                <div className='py-0.5'>3 star <span className='opacity-40'><ProductRating rating={3}/></span></div>
                <div className='py-0.5'>4 star <span className='opacity-40'><ProductRating rating={4}/></span></div>
                <div className='py-0.5'>5 star <span className='opacity-40'><ProductRating rating={5}/></span></div>
            </div>
        </div>

        <div className='mt-5 text-gray-400'>
            <div className='font-bold'>
                Compatible With
            </div>
            <div className='pl-2 cursor-pointer'>
                <div className='py-0.5'>GO GO</div>
                <div className='py-0.5'>NO GO</div>

            </div>
        </div>
    </div>
  )
}

export function MapItem(props){
    if(props.categorySelected && props.categorySelected === props.category){
        return (<CategoryItem key = {props.category} category = {props.category} categorySelected={props.categorySelected}/>);
    }
    return (
        <CategoryItem key = {props.category} category = {props.category} categoryHandleClick = {props.categoryHandleClick} categorySelected={props.categorySelected}/>
    )
}

export function MapEmptyItem(props){
    const categorySelected = ()=>{};
    return (<CategoryItem key = {props.category} category = {props.category} categorySelected={categorySelected}/>);
}

export function CategoryItem(props){

    if(props.category.length === 0){
        return(
            <>
                <div className="py-1 text-gray-400 my-1 blur-sm opacity-70"> 
                    <div className={'h-5 ml-1'}>kitchen-accessories</div>
                </div>            
            </>
        );
    }

    const selectedCls = props.categorySelected === props.category ?' font-bold' : '';
    return(
        <div className="h-6 my-1 text-gray-500 cursor-pointer hover:font-bold hover:border-b hover:border-dotted hover:border-blue-300" onClick={() => props.categoryHandleClick(props.category)}> 
            <div className={'capitalize ml-1' + selectedCls}>
                {props.category}
            </div>            
        </div>
    );
}

const UpdateCategoryProductCount = (productCount) => {
    const element = document.getElementById('category-product-count');
    if(element){
        element.innerText = productCount;
    }
}

export {Filter, UpdateCategoryProductCount}