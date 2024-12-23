'use client'
import React, { useState } from 'react'

export const AddToCartButton = ({product, handleAddToCartClick}) => {
  return (
    <>
        <button onClick={() => handleAddToCartClick(product)} className="py-2 addtocart-button">Add To Cart</button>    
    </>
  )
}

export const ContinueShoppingButton = ({handleClick}) => {
  return (
    <>
        <button className='w-40 py-2 px-2 bg-blue-400 text-white' onClick={handleClick}>Continue Shopping</button>
    </>
  )
}

export const ViewCartButton = ({handleClick}) => {
  return (
    <>
        <button className='w-40 py-2 px-2 bg-gray-400 text-white' onClick={handleClick}>View Cart</button>
    </>
  )
}

export const ContinueAndViewCartButtonCenter = ({continueHandleClick, viewCarthandleClick}) => {
  return (
    <>
      <div className='flex justify-center'>        
        <ContinueShoppingButton handleClick={continueHandleClick}/>
        <span className='w-2'></span>
        <ViewCartButton handleClick={viewCarthandleClick}/>
      </div>    
    </>
  );
}

export const ContinueAndViewCartButtonLeftRight = ({continueHandleClick, viewCarthandleClick}) => {
  return (
    <>
      <div className='w-full h-10'>        
        <div className='float-left ml-2'>
          <ContinueShoppingButton handleClick={continueHandleClick}/>
        </div>
        <div className='float-right mr-2'>
          <ViewCartButton handleClick={viewCarthandleClick}/>
        </div>        
      </div>    
    </>
  );
}

export const CartItemQuantity = ({quantity, handleClick}) => {
  const [qty, setQty] = useState(quantity);

  const handleChangeQty = (isUp) => {    

    let currentQty = qty;
    if(isUp){
      currentQty+=1;
      setQty(currentQty);
    }
    else{
      if(qty <= 1)
        return;

      currentQty-=1;
      setQty(currentQty);
    }

    if(handleClick)
    {
      handleClick(currentQty);
    }
  }

  return(
      <div className='flex float-right md:float-none md:justify-center'>
          <button className='mx-0 border-t border-l rounded-l quantity-button' onClick={()=>handleChangeQty(false)}>-</button>
          <div className='w-10 h-8 text-center mx-0 pt-1 border-t border-b border-solid bg-white border-gray-200'>{qty}</div>
          <button className='border-r border-t rounded-r quantity-button' onClick={()=>handleChangeQty(true)}>+</button>
      </div>
  );
}