/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import React, { useEffect, useState } from 'react'
import { GetCategoryList } from "@/app/services/productService";
import { IResponseServiceModel } from "@/app/models/responseModel";

export function Hello() {
    return <p>Hello!</p>
  }

export default function Category(props){
    const [categories, setCateories] = useState([]);
    const [categorySelected, setCategorySelected] = useState(props.category);
    const categoryEmptyList = ['','','','','','','','','','','','','','','','','','','','','','','',''];
      
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
        props.handleClick(p)
    }

    const handleClearClick = () => {
        setCategorySelected(undefined);
        props.handleClick()
    }

    const blurclass = categories && categories.length > 0 ? '' : ' blur-sm opacity-70';
  return (
    <div className='h-52 lg:h-full p-1 sm:p-2'>
        <div className={'text-base uppercase text-center ' + blurclass}>Filter</div>

        <div className={'my-1 h-8 p-1 font-bold border-gray-100 border-solid border' + blurclass}>
            {categorySelected ? <>
                    {categorySelected} (<span id='category-product-count'>{props.productCount?props.productCount : 0}</span>) 
                    <span className='float-right text-sm mr-2 text-red-500 cursor-pointer' onClick={() => handleClearClick()}>X</span>
                </> 
                : <>
                    <span className='text-gray-200 font-normal'>No category selected</span>
                </>
            }
        </div>

        <div className='h-28 overflow-x-auto w-full lg:h-auto border sm:border-0 border-gray-100'>
            {categories && categories.length > 0 ?                     
                <>
                    {categories.map((p, i) => ( <MapItem key = {i} category = {p} categoryHandleClick = {handleCategoryClick} categorySelected={categorySelected}/> ))}
                </>                 
                :
                <>
                    {categoryEmptyList.map((p, i) => ( <MapEmptyItem key = {i} category = {p}/> ))}
                </>
            }
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

export {Category, UpdateCategoryProductCount}