import React from 'react'

export default function CommentList(props){
    const emptyCl = props.isEmpty ? ' empty-item' : '';
  return (
    <>
        <div className={'italic' + emptyCl}>Total Comment: <strong>{props.total}</strong></div>
        <div className={'w-full mt-2 bg-white bg-opacity-50 p-1' + emptyCl}>
            {props.comments.map((c, i) => ( <div className='w-full border-b border-gray-300 mt-1 pb-1' key={i}>
                <div className='text-left'>{c.body}</div>
                <div className='text-right text-xs'>likes: <strong>{c.likes}</strong></div>
                <div className='text-right text-xs'>poster: <strong>{c.user?.fullName}</strong></div>
            </div> ))}
        </div>    
    </>
  )
}
