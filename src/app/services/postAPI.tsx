import * as constants from '@/app/constants'
import { FetchData } from '@/app/services/queryServiceBase';

const BuildSortParam = (type) => {
    switch(type){
        case(1):
            return 'sortBy=title&order=asc';
        case(2):
            return 'sortBy=title&order=desc';
        default:
            return 'sortBy=title&order=asc';
    }
}

const GetPostListUrl = (page, pageSize, sorting) => {
    if(!page || page <= 0)
    {
        return null;
    }

    const skip = (page - 1) * pageSize;
    const sort = BuildSortParam(sorting);
    const pagging = '&limit='+ pageSize + '&skip=' + skip;
    const url = constants.POST_URL + '?' + sort + pagging; 
    return url;
}

const GetPostCommentUrl = (postId) => {
    if(postId && postId > 0){
        return constants.POST_URL + '/' + postId + '/comments'; 
    }
    else{
        return null;
    }
}

const GetPostList = async (page, pageSize, sorting) => {
    return FetchData(GetPostListUrl(page, pageSize, sorting)); 
}

const GetPostComments = async (postId) => {
    return FetchData(GetPostCommentUrl(postId)); 
}

const GetPostDetail = async (postId) => {
    const url = constants.POST_URL + '/' + postId;
    return FetchData(url);
}

const Fetcher = () => {
    const fetcher = (url) => fetch(url).then((res) => res.json());
    return fetcher;
}

export { GetPostList, GetPostComments, GetPostDetail, GetPostListUrl, GetPostCommentUrl, Fetcher };