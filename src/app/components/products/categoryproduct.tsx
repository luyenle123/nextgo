'use client'

/* eslint-disable @typescript-eslint/no-unused-vars */
import { Category } from "@/app/components/products/category";
import { List } from "@/app/components/products/productList";
import { useState } from "react";

export default function CategoryProduct(){
  const [categorySelected, setCategorySelected] = useState();

  const handleClick = (category) => {
    setCategorySelected(category);
    console.log('>> ' + categorySelected);
  }
  return (
    <div className="clear-both flex min-h-svh">
      <div className="float-left h-auto min-w-80 bg-gray-100">
        <Category handleClick={handleClick}/>
      </div>
      
      <div className="float-left">
        <List/>
      </div>
      
    </div>    
  )
}