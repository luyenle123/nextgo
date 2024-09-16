/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import React, { useEffect, useState } from 'react'
import { GetCategoryList } from "@/app/services/productService";
import { IResponseServiceModel } from "@/app/models/responseModel";

import { SpeedInsights } from "@vercel/speed-insights/next"

export function Hello() {
    return <p>Hello!</p>
  }

export default function Category({handleClick}){
    const [cateories, setCateories] = useState([]);
    const [categorySelected, setCategorySelected] = useState();  
      
    const doFetchCategory = async () => {
        //console.log('>> fetch category via api');        
        const res = await GetCategoryList() as IResponseServiceModel;
        if(res.isSuccess)
        {
            setCateories(res.data);
        }
        else{
            //notify('Error: ' + res.data);
        }
    }
    
    useEffect(() => {
        doFetchCategory();
    }, []);


    const handleCategoryClick = (p) => {
        if(p === categorySelected) return;
        setCategorySelected(p);
        handleClick(p)
    }

    const handleClearClick = () => {
        setCategorySelected(undefined);
        handleClick()
    }

  return (
    <div className='h-52 lg:h-full p-1 sm:p-2'>
        <div className='text-base uppercase text-center'>Category</div>

        <div className='my-1 h-8 p-1 font-bold border-gray-100 border-solid border'>
            {categorySelected ? <>
                    {categorySelected} (<span id='category-product-count'>0</span>) 
                    <span className='float-right text-sm mr-2 text-red-500 cursor-pointer' onClick={() => handleClearClick()}>X</span>
                </> 
                : <>
                    <span className='text-gray-200 font-normal'>No category selected</span>
                </>
            }
        </div>

        {cateories && cateories.length > 0 && 
            <div className='h-28 overflow-x-auto w-full lg:h-auto border sm:border-0 border-gray-100'>
                {cateories.map((p, i) => ( <MapItem key = {i} category = {p} categoryHandleClick = {handleCategoryClick} categorySelected={categorySelected}/> ))}                
            </div>
        }
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

export function CategoryItem(props){
    const selectedCls = props.categorySelected === props.category ?' font-bold' : '';
    return(
        <div className="py-1 text-gray-500 cursor-pointer hover:bg-gray-200" onClick={() => props.categoryHandleClick(props.category)}> 
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

export {Category, UpdateCategoryProductCount}