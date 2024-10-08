/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { Fetcher, GetCategoryAndProductUrl } from "@/app/services/productAPI";
import { useEffect, useState } from "react";
import { Loader } from "@/app/components/loader/loader";
import { GetConfig, Pagination, PaginationEmpty } from '@/app/components/pagination/pagination'
import { GetPageInfo } from "@/app/components/pagination/paginationUtils";
import { ProductCard, ProductCardEmpty } from "./productCard";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useRouter } from 'next/navigation';
import { TopInfo } from "./topInfo";
import useSWRInfinite from "swr/infinite";
import Threecolumnblock from "@/app/components/blocks/threecolumnblock";

const Filter = dynamic(() => import('@/app/components/products/filter'), { loading: () => <></>})

export default function List(){
  const [categorySelected, setCategorySelected] = useState(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const cat = searchParams.get('cat');
  const productEmptyList = [{},{},{},{},{},{},{},{},{},{},{},{}];

  const removeUrlParameter = (param) => {
    // Create a new URL object based on the current URL
    const url = new URL(window.location.href);
    // Remove the specified parameter
    url.searchParams.delete(param);
    // Update the URL without reloading the page
    router.push(url.pathname + url.search);
  };   
  
  let category = categorySelected;
  if(!category && cat)
    category = cat;  

  const [pageData, setPageData] = useState({index:1, size: 12, sorting: 1}); 
  const {
    data,
    mutate,
    size,
    setSize,
    isValidating,
    isLoading
  } = useSWRInfinite((index) => GetCategoryAndProductUrl(category, index+1, pageData.size, pageData.sorting), Fetcher(), {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });
  const isLoadingMore = isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");

  let products = undefined;
  let pageInfo = {total:0, page:1, pageSize:12, sorting:1, totalPage:1};

  if(data && data.length > 0){
    products = data.map(item => item.products).flat();

    const pdata = data[data.length - 1]; 
    pageInfo = GetPageInfo(pdata.total, pdata.products.length, size, pageInfo.pageSize, pageInfo.sorting)
  }

  useEffect(() => {
    if(cat){
      setCategorySelected(cat);
      removeUrlParameter('cat');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

const handleSortingChanged = (e) => {
  const sortType = parseInt(e.target.value);
  pageInfo.sorting = sortType;

  setSize(1);
};


const categoryHandleClick = (category) => {
    setCategorySelected(category);
}

const PageChanged = (page, pageSize) => {
  if(page !== pageInfo.page){
    pageInfo.pageSize = pageSize;

    setPageData({index:page, size: pageSize, sorting: 1});
    setSize(page);
  }    
}; 

  let gotData = false;
  if(products){ gotData = true; }
  const config = GetConfig(false, gotData, pageInfo);
  config.handleSortingChanged = handleSortingChanged;
  config.PageChanged = PageChanged;
  config.loadMoreOnly = true;

  return (
    <>      
      <div className="lg:flex clear-both min-h-svh mt-2 mb-2 max-w-1920 mx-auto">    
        <div className="float-left sm:float-none md:float-none w-full lg:w-80 h-auto min-w-80">
          <Filter handleClick={categoryHandleClick} category = {category} productCount = {config.pageInfo.total}/>
        </div>
        
        {isLoadingMore && <Loader isActive={true}/>}

        <div className="float-left sm:float-none md:float-none">         
            <TopInfo products={products} pageinfo={pageInfo} config={config}/>

            <div className="flex flex-wrap justify-left float-left">
              {products && products.length > 0 ? 
              <>
                { products.map((product, i) => (<ProductItemContainer  key = {i} product={product} />)) }
              </> : 
              <>
                { productEmptyList.map((p, i) => (<ProductItemContainerEmpty key={i}/> )) }
              </>}
            </div>

            {config.pageInfo.allowLoadMore && 
                <div className="px-1">
                  {products && products.length > 0 ? <Pagination config={config}/> : <PaginationEmpty/>}
                </div>
            }
        </div>
      </div>
      
      <Threecolumnblock/>
    </>
  )
}

export function ProductItemContainer(props){
  return(
    <>      
      <div className="w-full sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/3 2xl:w-1/4 relative">
        <ProductCard product={props.product}/>
      </div>    
    </>
  );
}

export function paginationEmpty(){
  return(
    <>
        <div className="w-full h-7 bg-slate-400">
            <div className='inline-block float-left'>
            </div>
        </div>    
    </>
  );
}

export function ProductItemContainerEmpty(){
  return(
    <>      
      <div className="w-full sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/3 2xl:w-1/4 relative blur-sm opacity-40"> 
        <ProductCardEmpty/>
      </div>    
    </>
  );
}