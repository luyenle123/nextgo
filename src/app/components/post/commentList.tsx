import React from 'react'

export default function CommentList(props){
    const emptyCl = props.isEmpty ? ' empty-item' : '';
  return (
    <>
        <div className={'italic' + emptyCl}>Total Comment: <strong>{props.isEmpty ? '00' : props.total}</strong></div>
        <div className={'w-full mt-2 bg-white bg-opacity-20 p-1' + emptyCl}>
            {props.comments?.map((c, i) => ( <div className='w-full border-b border-gray-300 mt-1 pb-1' key={i}>
                <div className='text-left'>{props.isEmpty ? 'We all are favored to see your magnificence.' : c.body}</div>
                <div className='text-right text-xs'>likes: <strong>{props.isEmpty ? '00' : c.likes}</strong></div>
                <div className='text-right text-xs'>poster: <strong>{props.isEmpty ? 'Julian James' : c.user?.fullName}</strong></div>
            </div> ))}
        </div>    
    </>
  )
}
