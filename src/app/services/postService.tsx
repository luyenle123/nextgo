import * as constants from '@/app/constants'
import { FetchData, FetchDataX } from '@/app/services/queryServiceBase';

const GetPostList = async (page, pageSize) => {
    const skip = (page - 1) * pageSize;        
    const limit = 'limit='+ pageSize + '&skip=' + skip;
    const url = constants.POST_LIST_URL + '?' + limit;        
    return FetchDataX(url);
}

export async function GetPostListX<IResponseServiceModel>(page, pageSize){
    const skip = (page - 1) * pageSize;        
    const limit = 'limit='+ pageSize + '&skip=' + skip;
    const url = constants.POST_LIST_URL + '?' + limit;        
    return FetchDataX(url) as IResponseServiceModel;
}

const GetPostDetail = async (id) => {
    const url = constants.POST_LIST_URL + '/' + id;
    return FetchData(url);
}


export { GetPostList, GetPostDetail};