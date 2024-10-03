import * as constants from '@/app/constants'
import { BuildSortParam } from "@/app/components/pagination/paginationUtils";
import { FetchData } from '@/app/services/queryServiceBase';

const GetCategoryListUrl = () => {
    return constants.CATEGORY_LIST_URL;
}

const GetCategoryProductUrl = (category, page, pageSize, sorting) => {
    const skip = (page - 1) * pageSize;
    const sort = BuildSortParam(sorting);
    const pagging = '&limit='+ pageSize + '&skip=' + skip;
    const url = constants.CATEGORY_URL + '/' + category + '?' + sort + pagging;
    return url;
}

const GetProductListUrl = (page, pageSize, sorting) => {
    const skip = (page - 1) * pageSize;
    const sort = BuildSortParam(sorting);
    const pagging = '&limit='+ pageSize + '&skip=' + skip;
    const url = constants.PRODUCT_LIST_URL + '?' + sort + pagging; 
    return url;
}

const GetCategoryAndProductUrl = (category, page, pageSize, sorting) => {
    //console.log('>> build url >> category: ' + category + ' / page:'+page + ' / pageSize:' + pageSize + ' / sorting:' + sorting);
    if(category && category.length > 0){
        return GetCategoryProductUrl(category, page, pageSize, sorting);
    }
    const skip = (page - 1) * pageSize;
    const sort = BuildSortParam(sorting);
    const pagging = '&limit='+ pageSize + '&skip=' + skip;
    const url = constants.PRODUCT_LIST_URL + '?' + sort + pagging; 
    return url;
}

const GetProductDetailUrl = (productId) => {
    if(!productId || productId <=0 ){
        return null;
    }
    const url = constants.PRODUCT_DETAIL_URL + '/' + productId;
    return url;
}

const GetCategoryList = () => {
    const url = constants.CATEGORY_LIST_URL;
    return FetchData(url);
}

const SearchProductUrl = (key) => {
    if(!key || key.length == 0){
        return null;
    }
    const url = constants.SEARCH_PRODUCT_URL + '?q=' + key ;
    return url;
}

const GetCategoryProduct = async (category, page, pageSize, sorting) => {
    return FetchData(GetCategoryProductUrl(category, page, pageSize, sorting));
}

const GetProductList = async (page, pageSize, sorting) => {
    // const skip = (page - 1) * pageSize;
    // const sort = BuildSortParam(sorting);
    // const pagging = '&limit='+ pageSize + '&skip=' + skip;
    //const url = constants.PRODUCT_LIST_URL + '?' + sort + pagging;     
    //const url = GetProductListUrl(page, pageSize, sorting);
    return FetchData(GetProductListUrl(page, pageSize, sorting));
}

const GetProductDetail = async (productId) => {
    return FetchData(GetProductDetailUrl(productId));
}

const SearchProduct = async (key) => {
    return FetchData(SearchProductUrl(key));
}

const Fetcher = () => {
    const fetcher = (url) => fetch(url).then((res) => res.json());
    return fetcher;
}

export { Fetcher, GetCategoryList, GetCategoryProduct, GetProductList, GetProductDetail, SearchProduct, GetCategoryListUrl, GetCategoryProductUrl, GetProductListUrl, GetCategoryAndProductUrl, GetProductDetailUrl, SearchProductUrl };
