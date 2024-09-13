import React from 'react'

export default function NotFoundPage(){
  return (
    <div className='h-700 pt-40'>
      <div className='w-full h-full'>
          <div className='sm:w-3/4 max-w-500 h-28 my-0 mx-auto border-solid border-t border-b border-gray-300 bg-white font-bold text-gray-400'>
              <div className='h-5 text-center mt-5 text-4xl '>
                500
              </div>
              <div className='h-5 text-center mt-5 text-xl '>
                Server-side error occurred
              </div>
          </div>
      </div>
    </div>
  )
}