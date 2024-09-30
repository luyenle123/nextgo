import React, { useState } from 'react'
import { GetPostComments } from "@/app/services/postService";
import { GetPageInfo } from '@/app/components/pagination/paginationUtils';
import { toast } from 'react-toastify';
import { LoaderToggle } from '@/app/components/loader/loader';
import { IResponseServiceModel } from "@/app/models/responseModel";

export default function PostItem(props){
    const [showComment, setShowComment] = useState(false);
    const [comments, setComments] = useState([]);
    const [pageInfo, setPageInfo] = useState({total:0, pageSize:12, sorting:1});
    const [isLoading, setIsLoading] = useState(false);

    const emptyComments = [{},{}];

    const getComment = async(postId) => {
        LoaderToggle(true);
        setIsLoading(true);
        var res = await GetPostComments(postId) as IResponseServiceModel;
        if(res.isSuccess){
            setComments(res.data.comments);
            setPageInfo(GetPageInfo(res.data.total, res.data.comments.length, 1, pageInfo.pageSize, pageInfo.sorting));
        }
        else{
            toast('Error: ' + res.data);
        }
        setIsLoading(false);
        LoaderToggle(false);
    }
    
    const handleShowCommentClick = async(postId) => {
        setShowComment(!showComment);
        if(!showComment){
            await getComment(postId);
        }
    }

    const activecl = showComment ? 'after:content-["-"]' : '';
    return(
        <>
            <div className='w-full mb-3 p-2 bg-slate-100'>
                <div className='w-full cursor-pointer' onClick={() => handleShowCommentClick(props.post.id)}>
                    <span className='font-bold text-cyan-900 text-sm'>{props.post.title}</span>   
                    <span className='blog-reaction-count'>{props.post.views} views</span>
                    <span className='blog-reaction-count'>{props.post.reactions?.likes} likes</span> 
                    <span className='blog-reaction-count'>{props.post.reactions?.dislikes} dislikes</span>

                    <span className= {'float-right font-bold text-xl text-gray-500 after:content-["+"] ' + activecl}></span>
                    {props.post.tags && props.post.tags.length > 0 && 
                        <div className='text-xs ml-2'>
                            <span className='text-slate-400'>tags:</span> {props.post.tags.map((t, i) => (<span className='text-slate-400 mr-1 italic' key={i}>{t}</span>))}
                        </div>
                    }
                </div>

                {showComment && 
                    <>
                        <div className='w-full min-h-24 mt-5 pl-5'>
                            {isLoading ? 
                            <>
                                <div className='italic empty-item'>Total Comment: <strong>00</strong></div>
                                <div className='w-full mt-2 bg-gray-100 p-1 empty-item'>
                                    {emptyComments.map((c, i) => ( <div className='w-full border-b border-gray-300 mt-1 pb-1' key={i}>
                                        <div className='text-left'>{props.post.title}</div>
                                        <div className='text-right text-xs'>likes: <strong>0</strong></div>
                                        <div className='text-right text-xs'>poster: <strong>user fullname</strong></div>
                                    </div> ))}
                                </div>
                            </>
                            :
                            <>
                                <div className='italic'>Total Comment: <strong>{pageInfo.total}</strong></div>
                                <div className='w-full mt-2 bg-cyan-200 bg-opacity-10 p-1'>
                                    {comments.map((c, i) => ( <div className='w-full border-b border-gray-300 mt-1 pb-1' key={i}>
                                        <div className='text-left'>{c.body}</div>
                                        <div className='text-right text-xs'>likes: <strong>{c.likes}</strong></div>
                                        <div className='text-right text-xs'>poster: <strong>{c.user?.fullName}</strong></div>
                                    </div> ))}
                                </div>
                            </>
                            }
                        </div>                
                    </>}                
            </div>
        </>
    );
}
