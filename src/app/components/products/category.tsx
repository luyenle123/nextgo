'use client'

import React, { useEffect, useState } from 'react'
import { GetCategoryList } from "@/app/services/productService";
import { IResponseServiceModel } from "@/app/models/responseModel";

const Category = ({handleClick}) => {
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
    <div className='p-2'>
        <div className='text-base uppercase text-center py-3'>Category</div>
        <div className='my-2 h-10 p-2 font-bold border-gray-200 border-solid border rounded'>
            {
                categorySelected && <>
                    {categorySelected} (<span id='category-product-count'>0</span>) 
                    <span className='float-right text-sm h-10 text-red-500 cursor-pointer' onClick={() => handleClearClick()}>X</span>
                </> 
            }
        </div>
        {cateories && cateories.length > 0 && 
            <div>
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
    return(
        <div className="p-1 text-gray-500 cursor-pointer" onClick={() => props.categoryHandleClick(props.category)}> 
            <div className={props.categorySelected === props.category ? "capitalize ml-2 font-bold" : "capitalize ml-2"}>
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