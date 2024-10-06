'use client'

import React, { useState } from 'react'
import { Fetcher, GetPostListUrl } from "@/app/services/postAPI";
import { GetConfig, Pagination } from '@/app/components/pagination/pagination';
import { toast } from 'react-toastify';
import { GetPageInfo } from '@/app/components/pagination/paginationUtils';
import { Loader } from '@/app/components/loader/loader';
import PostItem from './postItem';
import useSWR from 'swr'

export default function BlogList() {
    const [pageData, setPageData] = useState({index:1, size: 12, sorting: 1}); 

    const { data, error, isLoading } = useSWR(GetPostListUrl(pageData.index, pageData.size, pageData.size), Fetcher(), {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
      });
    const pageInfo = data ? GetPageInfo(data.total, data.length, pageData.index, pageData.size, 1) : {page:1, pageSize:12, sorting:1};

    const emptyPosts = [{},{},{},{},{},{},{},{},{},{},{},{}];

    if(error){
        toast.error(error);
    }

    const PageChanged = (page, pageSize) => {
        if(page !== pageInfo.page){
            pageInfo.pageSize = pageSize;
            setPageData({index:page, size: pageSize, sorting: 1});
            return;
        }

        if(pageSize !== pageInfo.pageSize){
            pageInfo.pageSize = pageSize;
            setPageData({index:page, size: pageSize, sorting: 1});
            return;
        }
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
        <div className='w-full py-2 px-2 md:px-20 lg:px-40 xl:px-80 text-sm max-w-1920 mx-auto'>
            <div className='uppercase text-4xl text-center'>
                Blog
            </div>

            {isLoading && <Loader isActive={true}/>}
          
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