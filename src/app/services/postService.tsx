import * as constants from '@/app/constants'
import { FetchData, FetchDataX } from '@/app/services/queryServiceBase';

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

export async function GetPostListX<IResponseServiceModel>(page, pageSize){
    const skip = (page - 1) * pageSize;        
    const limit = 'limit='+ pageSize + '&skip=' + skip;
    const url = constants.POST_URL + '?' + limit;        
    return FetchDataX(url) as IResponseServiceModel;
}

const GetPostList = async (page, pageSize, sorting) => {
    const skip = (page - 1) * pageSize;
    const sort = BuildSortParam(sorting);
    const pagging = '&limit='+ pageSize + '&skip=' + skip;
    const url = constants.POST_URL + '?' + sort + pagging; 
    return FetchData(url); 
}

const GetPostComments = async (postId) => {
    const url = constants.POST_URL + '/' + postId + '/comments'; 
    return FetchData(url); 
}

const GetPostDetail = async (postId) => {
    const url = constants.POST_URL + '/' + postId;
    return FetchData(url);
}


export { GetPostList, GetPostComments, GetPostDetail };