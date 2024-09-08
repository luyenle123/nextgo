import * as constants from '@/app/constants'
import { BuildSortParam } from "@/app/components/pagination/paginationUtils";
import { FetchData } from '@/app/services/queryServiceBase';

const GetCategoryList = async () => {
    const url = constants.CATEGORY_LIST_URL;
    return FetchData(url);
}

const GetCategoryProduct = async (category, page, pageSize, sorting) => {
    const skip = (page - 1) * pageSize;
    const sort = BuildSortParam(sorting);
    const pagging = '&limit='+ pageSize + '&skip=' + skip;
    const url = constants.CATEGORY_URL + '/' + category + '?' + sort + pagging;;  
    return FetchData(url);
}

const GetProductList = async (page, pageSize, sorting) => {
    const skip = (page - 1) * pageSize;
    const sort = BuildSortParam(sorting);
    const pagging = '&limit='+ pageSize + '&skip=' + skip;
    const url = constants.PRODUCT_LIST_URL + '?' + sort + pagging; 
    return FetchData(url);
}

const GetProductDetail = async (productId) => {
    const url = constants.PRODUCT_DETAIL_URL + '/' + productId;
    return FetchData(url);
}

const SearchProduct = async (key) => {
    const url = constants.SEARCH_PRODUCT_URL + '?q=' + key ;
    return FetchData(url);
}

export { GetCategoryList, GetCategoryProduct, GetProductList, GetProductDetail, SearchProduct };
