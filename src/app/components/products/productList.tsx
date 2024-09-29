/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { GetProductList, GetCategoryProduct } from "@/app/services/productService";
import { useEffect, useState } from "react";
import { IResponseServiceModel } from "@/app/models/responseModel";
import { LoaderToggle } from "@/app/components/loader/loader";
import { IProductItem } from "@/app/models/productmodel";
import { GetConfig, CloneConfig } from '@/app/components/pagination/pagination'
import { GetPageInfo } from "@/app/components/pagination/paginationUtils";
import { UpdateCategoryProductCount } from "@/app/components/products/category";
import { toast } from 'react-toastify';
import { DoAddToCart, UpdateCartInfo } from "@/app/components/cart/cart";
import { ProductCard, ProductCardEmpty } from "./productCard";
import dynamic from "next/dynamic";
import CartPopupResult from "../cart/cartPopupResult";
import { useSearchParams } from "next/navigation";
import { useRouter } from 'next/navigation';

const Category = dynamic(() => import('@/app/components/products/category'), { loading: () => <><p>Loading...</p></>})
// const CartPopupResult = dynamic(() => import('@/app/components/cart/cartPopupResult'), { loading: () => <></>})

export default function List(){
  const [products, setProducts] = useState<IProductItem[] | undefined>(undefined);
  const [pageinfo, setPageInfo] = useState({total:0, page:1, pageSize:12, sorting:1, totalPage:1});
  const [categorySelected, setCategorySelected] = useState(null);
  const [cartProduct, setCartProduct] = useState<IProductItem | undefined>(undefined);
  const searchParams = useSearchParams();
  const router = useRouter();   

  const cat = searchParams.get('cat');
  const productEmptyList = [{},{},{},{},{},{},{},{},{},{},{},{}];    
  
  let fetchProduct = false;

  const FetchProduct = async (page:number) => {
    if(categorySelected && !fetchProduct){
      FetCategoryProduct(categorySelected, page);
      return;
    }      

    LoaderToggle(true);
    const res = await GetProductList(page, pageinfo.pageSize, pageinfo.sorting) as IResponseServiceModel;

    setPageInfo(GetPageInfo(res.data.total, res.data.products.length, page, pageinfo.pageSize, pageinfo.sorting));            
    setProducts(res.data.products);
    LoaderToggle(false);
  }

  const FetCategoryProduct = async (category, page) => {
    LoaderToggle(true);

    if(!page) { page = 1; }
    const res = await GetCategoryProduct(category, page, pageinfo.pageSize, pageinfo.sorting) as IResponseServiceModel;
    if(res.isSuccess)
    {
        setProducts(res.data.products);
        setPageInfo(GetPageInfo(res.data.total, res.data.products.length, page, pageinfo.pageSize, pageinfo.sorting));
        UpdateCategoryProductCount(res.data.total);
        setCategorySelected(category);
    }
    else{
        toast.error('Error: ' + res.data);
    }
    
    LoaderToggle(false);
  }

  const LoadMoreProduct = async (category, page) => {
    LoaderToggle(true);
    let res = null;
    if(categorySelected && !fetchProduct){
        res = await GetCategoryProduct(category, page, pageinfo.pageSize, pageinfo.sorting);
    }
    else
    {
        res = await GetProductList(page, pageinfo.pageSize, pageinfo.sorting);
        setCategorySelected(undefined);
    }

    if(!res){
        LoaderToggle(false);
        return;
    }

    if(res.isSuccess)
    {
        if(res.data.products?.length > 0){
            const productlist = products;
            res.data.products.forEach(element => {
                productlist.push(element);
            });
            setProducts(productlist);
        }

        setPageInfo(GetPageInfo(res.data.total, res.data.products.length, page, pageinfo.pageSize, pageinfo.sorting));            
    }
    else{
        //notify('Error: ' + res.data);
    }
    LoaderToggle(false);
}    

let category = categorySelected;
if(!category && cat)
  category = cat;

useEffect(() => {
  const removeUrlParameter = (param) => {
    // Create a new URL object based on the current URL
    const url = new URL(window.location.href);
    // Remove the specified parameter
    url.searchParams.delete(param);
    // Update the URL without reloading the page
    router.push(url.pathname + url.search);
  }; 

  async function QueryProduct(page){
    LoaderToggle(true);

    let res = null;
    if(category){
      res = await GetCategoryProduct(category, page, pageinfo.pageSize, pageinfo.sorting) as IResponseServiceModel;      
    }
    else{
      res = await GetProductList(page, pageinfo.pageSize, pageinfo.sorting) as IResponseServiceModel;
    }

    removeUrlParameter('cat');
    setPageInfo(GetPageInfo(res.data.total, res.data.products.length, page, pageinfo.pageSize, pageinfo.sorting));            
    setProducts(res.data.products);
    LoaderToggle(false);
  }

  QueryProduct(1);
}, [pageinfo.pageSize, pageinfo.sorting, category, router]);

const handleSortingChanged = (e) => {
  const sortType = parseInt(e.target.value);
  pageinfo.sorting = sortType;

  FetchProduct(1);        
};

const handleNextClick = () => {
    if(pageinfo.page >= pageinfo.totalPage) return;
    let page = pageinfo.page+1;
    if(page > pageinfo.totalPage){ page = pageinfo.page}
    FetchProduct(page);
};

const handleBackClick = () => {
    if(pageinfo.page <= 1) return;
    let page = pageinfo.page-1;
    if(page <= 0){ page = 1}
    FetchProduct(page);
};

const handlePaginationNumberClick = (e) => {
    if(parseInt(e.target.value) === pageinfo.page) return;
    FetchProduct(parseInt(e.target.value));
};  

const handleAddToCartClick = (product) => {
  LoaderToggle(true);
  DoAddToCart(product, (sucess:boolean) => {
    if(sucess){
      LoaderToggle(false, () => {
        setTimeout(function(){setCartProduct(product)}, 100);
      });
      UpdateCartInfo(null, 1);
    }else{
      LoaderToggle(false);
    }
  });
};

const handleItemDisplayChanged = (e) => {
  const newPageSize = parseInt(e.target.value);
  pageinfo.pageSize = newPageSize;

  FetchProduct(1);
};

const categoryHandleClick = (category) => {
  if(!category){
    fetchProduct = true;
    setCategorySelected(undefined);            
    LoaderToggle(true);
    FetchProduct(1);
  }
  else
  {
    fetchProduct = false;
    FetCategoryProduct(category, 1);
  } 
}

const handleLoadMoreClick = (e) => {
  // Load more product
  const page = pageinfo.page + 1;
  if(page > config.pageInfo.totalPage){ return; }

  LoadMoreProduct(categorySelected, page);
};

  let gotData = false;
  if(products){ gotData = true;}
  const config = GetConfig(false, gotData, pageinfo);
  config.handlePaginationNumberClick = handlePaginationNumberClick;
  config.handleBackClick = handleBackClick;
  config.handleNextClick = handleNextClick;
  config.handleAddToCartClick = handleAddToCartClick;
  config.handleLoadMoreClick = handleLoadMoreClick;
  config.handleItemDisplayChanged = handleItemDisplayChanged;
  config.handleSortingChanged = handleSortingChanged;
  config.hideSortOption = false;
  config.hideDisplayPageInfo = true;
  config.hideDisplayOption = true;
  config.hidePageDropDownInfo = true;

  const config1 = CloneConfig(config);
  config1.hideSortOption = false;

  return (
    <>
    <div className="lg:flex clear-both min-h-svh mt-2 mb-2">    
      <div className="float-left sm:float-none md:float-none w-full lg:w-80 h-auto min-w-80">
        <Category handleClick={categoryHandleClick} category = {category} productCount = {config.pageInfo.total}/>
      </div>
      
      <div className="float-left sm:float-none md:float-none">
        {/* <div className="px-1">
          {products && products.length > 0 ? <Pagination config={config}/> : 
          <>
            <PaginationEmpty/>
          </>}
        </div> */}
          
          <TopInfor products={products} pageinfo={pageinfo} config={config}/>

          <div className="flex flex-wrap justify-left float-left">
            {products && products.length > 0 ? 
            <>
              {
                products.map((product, i) => (
                  <ProductItemContainer  key = {i} product={product} handleAddToCartClick={handleAddToCartClick}/>
                ))                
              }
            </> : 
            <>
            {
              productEmptyList.map((p, i) => (
                <ProductItemContainerEmpty key={i}/>
              ))
            }
            </>}
          </div>

          {config.pageInfo.allowLoadMore && 
                <div className='w-full inline-block text-center pt-10 pb-5'>
                    <button className='min-w-80 px-5 py-3 bg-gray-200 cursor-pointer hover:bg-gray-300 active:bg-gray-200' onClick={config.handleLoadMoreClick}>Load More (<span className='font-bold'>{config.pageInfo.remainingCount}</span> items)</button>
                </div>
            }

      </div>
    </div> 
     { cartProduct && <CartPopupResult product={cartProduct} handleCallback={() => { setCartProduct(undefined)}}/> }
    </>
  )
}

export function ProductItemContainer({product, handleAddToCartClick}){
  return(
    <>      
      <div className="w-full sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/3 2xl:w-1/4 relative">
        <ProductCard product={product} handleAddToCartClick={handleAddToCartClick}/>
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
        {/* blur-sm opacity-50 */}
        <ProductCardEmpty/>
      </div>    
    </>
  );
}

export function TopInfor(props){
  return(
    <>
        {
          props.products && props.products.length > 0 ? 
          <div className="float-left w-full px-1">
            <div className='float-left w-20 font-bold'>
              {props.pageinfo?.total} items      
            </div>

            <SortOption config={props.config}/>
          </div>
          :
          <>
            <div className="float-left w-full px-1 opacity-40 blur-0">
              <div className='float-left w-20  ont-bold text-gray-200'>
                00 items      
              </div>

              <SortOption config={props.config}/>
            </div>          
          </>
        }    
    </>
  );
}

export function SortOption ({config}) {
  return(
      <div className='pr-0.5 float-right h-6'>
          <span className="text-xs ml-1">Sort: </span>
          <select onChange={config?.handleSortingChanged} value={config?.pageInfo?.sorting} className='bg-white'>
              <option key={1} value={1}>Price: L to H</option>
              <option key={2} value={2}>Price: H to L</option>
              <option key={3} value={3}>Title: A-Z</option>
              <option key={4} value={4}>Title: Z-A</option>
          </select>              
      </div>
  );
};