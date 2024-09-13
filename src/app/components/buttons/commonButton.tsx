import React from 'react'

export const AddToCartButton = ({product, handleAddToCartClick}) => {
  return (
    <>
        <button onClick={() => handleAddToCartClick(product)} className="py-2 px-4 text-emerald-800 font-bold bg-slate-300 hover:bg-slate-400 active:bg-slate-300">Add To Cart</button>    
    </>
  )
}

export const ContinueShoppingButton = ({handleClick}) => {
  return (
    <>
        <button className='w-40 py-3 px-2 bg-blue-400 text-white' onClick={handleClick}>Continue Shopping</button>
    </>
  )
}

export const ViewCartButton = ({handleClick}) => {
  return (
    <>
        <button className='w-40 py-3 px-2 bg-gray-400 text-white' onClick={handleClick}>View Cart</button>
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
      <div className='w-full'>        
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