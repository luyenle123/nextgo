'use client'

import React, { useEffect, useState } from 'react'
import { GetPostList } from "@/app/services/postService";
import { IResponseServiceModel } from "@/app/models/responseModel";

import { GetConfig, Pagination } from '@/app/components/pagination/pagination';
import { toast } from 'react-toastify';
import { GetPageInfo } from '@/app/components/pagination/paginationUtils';
import { LoaderToggle } from '@/app/components/loader/loader';
import PostItem from './postItem';
import useSWR from 'swr'
import * as constants from '@/app/constants'

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function BlogList() {
    //const [posts, setPosts] = useState(undefined);
    //const [isLoading, setIsLoading] = useState(false);
    //const [pageInfo, setPageInfo] = useState({page:1, pageSize:12, sorting:1});

    const page = 1;
    const pageSize = 12;
    const skip = (page - 1) * pageSize;        
    const limit = 'limit='+ pageSize + '&skip=' + skip;
    const url = constants.POST_URL + '?' + limit;       
    const { data, error, isLoading } = useSWR(url, fetcher)
    console.log(data);

    const pageInfo = data ? GetPageInfo(data.total, data.length, 1, 12, 1) : {page:1, pageSize:12, sorting:1};

    const emptyPosts = [{},{},{},{},{},{},{},{},{},{},{},{}];

    // useEffect(() => {
    //     async function fetchPosts() {                
    //         const res = await GetPostList(1, pageInfo.pageSize, pageInfo.sorting) as IResponseServiceModel;
  
    //         //setPosts(res.data.posts);
    //         setPageInfo(GetPageInfo(res.data.total, res.data.posts.length, 1, pageInfo.pageSize, pageInfo.sorting));            
    //         //setIsLoading(false);
    //         LoaderToggle(false);
    //     }
  
    //     //setIsLoading(true);
    //     LoaderToggle(true);
    //     fetchPosts();

    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    const queryData = async (page) => {
        // LoaderToggle(true);
        // //setIsLoading(true);
        // const res = await GetPostList(page, pageInfo.pageSize, pageInfo.sorting) as IResponseServiceModel;
        // if(res.isSuccess)
        // {
        //     //setPosts(res.data.posts);
        //     setPageInfo(GetPageInfo(res.data.total, res.data.posts.length, page, pageInfo.pageSize, pageInfo.sorting));
        // }
        // else{
        //     toast('Error: ' + res.data);
        // }
        // //setIsLoading(false);
        // LoaderToggle(false);
    }    

    const PageChanged = (page, pageSize) => {
        // if(page !== pageInfo.page){
        //     pageInfo.pageSize = pageSize;
        //     queryData(page);
        //     return;
        // }

        // if(pageSize !== pageInfo.pageSize){
        //     pageInfo.pageSize = pageSize;
        //     queryData(1);
        //     return;
        // }
    };    

    const gotData = data?.posts && data?.posts.length > 0;
    const config = GetConfig(isLoading, gotData, pageInfo);
    config.hideSortOption = true;
    config.hideDisplayOption = true;
    config.hideDisplayPageInfo = true;
    config.hidePageOption = true;
    config.hidePageDropDownInfo = true;
    config.PageChanged = PageChanged;

    const emptyConfig = GetConfig(isLoading, true, GetPageInfo(250, 12, 1, pageInfo.pageSize, pageInfo.sorting));
    emptyConfig.hideSortOption = true;
    emptyConfig.hideDisplayOption = true;
    emptyConfig.hideDisplayPageInfo = true;
    emptyConfig.hidePageOption = true;
    emptyConfig.hidePageDropDownInfo = true;

    const posts = data?.posts;

    return (
        <div className='w-full py-2 px-2 md:px-20 lg:px-40 xl:px-80 text-sm'>
            <div className='uppercase text-4xl text-center'>
                Blog
            </div>
          
            <div className='mt-5'>
                {!posts ? 
                    <>
                        <div className='opacity-80 blur-sm'>
                            <Pagination config={emptyConfig}/>
                        </div>
                    </> 
                    : 
                    <>{config.hasData && <Pagination config={config}/>}</>
                }

                <div className="w-full mt-5">
                    {!posts ? 
                    <>
                        {emptyPosts.map((post, i) => (
                            <PostItem key={i} post={post} isEmpty={true}/>
                        ))}                    
                    </> 
                    : 
                    <>
                        {posts.map((post, i) => (
                            <PostItem key={i} post={post}/>
                        ))}                    
                    </>}
                </div>
            </div>                 
        </div>
    )
}