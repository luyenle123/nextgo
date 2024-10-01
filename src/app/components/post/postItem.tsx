import React, { useState } from 'react'
import { GetPostComments } from "@/app/services/postService";
import { GetPageInfo } from '@/app/components/pagination/paginationUtils';
import { toast } from 'react-toastify';
import { LoaderToggle } from '@/app/components/loader/loader';
import { IResponseServiceModel } from "@/app/models/responseModel";
import CommentList from './commentList';

export default function PostItem(props){
    const [showComment, setShowComment] = useState(false);
    const [comments, setComments] = useState([]);
    const [pageInfo, setPageInfo] = useState({total:0, pageSize:12, sorting:1});
    const [isLoading, setIsLoading] = useState(false);

    const emptyComments = [{},{}];

    const getComment = async(postId) => {
        LoaderToggle(true);
        setIsLoading(true);
        const res = await GetPostComments(postId) as IResponseServiceModel;
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

    const emptycl = props.isEmpty ? ' empty-item' : '';
    return(
        <>
            <div className={'w-full mb-3 p-2 bg-slate-100' + emptycl}>
                <div className='w-full cursor-pointer' onClick={() => handleShowCommentClick(props.post.id)}>
                    <span className='font-bold text-cyan-900 text-sm'>{props.isEmpty ? 'A long black shadow slid across the pavement' : props.post.title}</span>   
                    <span className='blog-reaction-count'>{props.isEmpty ? '100' : props.post.views} views</span>
                    <span className='blog-reaction-count'>{props.isEmpty ? '100' : props.post.reactions?.likes} likes</span> 
                    <span className='blog-reaction-count'>{props.isEmpty ? '100' : props.post.reactions?.dislikes} dislikes</span>

                    <span className= {'float-right font-bold text-xl text-gray-500 '}> {showComment ? <>&#8722;</> : <>&#43;</>}</span>
                    {props.isEmpty ? 
                    <>
                        <div className='blog-item-tag-wrapper'>
                            <span className='tag-label'>tags:</span> <span className='tag-item'>tag1</span> <span className='tag-item'>tag2</span> <span className='tag-item'>tag3</span>
                        </div>                    
                    </> : 
                    <>
                        {props.post.tags && props.post.tags.length > 0 && 
                            <div className='text-xs ml-2'>
                                <span className='text-slate-400'>tags:</span> {props.post.tags.map((t, i) => (<span className='text-slate-400 mr-1 italic' key={i}>{t}</span>))}
                            </div>
                        }                    
                    </>}
                </div>

                {showComment && 
                    <>
                        <div className='w-full min-h-24 mt-5 pl-5'>
                            {isLoading ? 
                                <CommentList comments={emptyComments} total={pageInfo.total} isEmpty={true}/>
                            :
                                <CommentList comments={comments} total={pageInfo.total} isEmpty={false}/>
                            }
                        </div>                
                    </>}                
            </div>
        </>
    );
}
