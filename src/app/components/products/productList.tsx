/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { GetProductList, GetCategoryProduct } from "@/app/services/productService";
import { useEffect, useState } from "react";
import { IResponseServiceModel } from "@/app/models/responseModel";
import { LoaderToggle } from "@/app/components/loader/loader";
import { IProductItem } from "@/app/models/productmodel";
import { GetConfig, CloneConfig, Pagination, PaginationEmpty } from '@/app/components/pagination/pagination'
import { GetPageInfo } from "@/app/components/pagination/paginationUtils";
import { UpdateCategoryProductCount } from "@/app/components/products/category";
import { toast } from 'react-toastify';
import { DoAddToCart, UpdateCartInfo } from "@/app/components/cart/cart";
import { ProductCard, ProductCardEmpty } from "./productCard";
import dynamic from "next/dynamic";
import CartPopupResult from "../cart/cartPopupResult";
import { useSearchParams } from "next/navigation";
import { useRouter } from 'next/navigation';
import { TopInfo } from "./topInfo";

const Category = dynamic(() => import('@/app/components/products/category'), { loading: () => <><p>Loading...</p></>})

export default function List(){
  const [products, setProducts] = useState<IProductItem[] | undefined>(undefined);
  const [pageInfo, setPageInfo] = useState({total:0, page:1, pageSize:12, sorting:1, totalPage:1});
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
    const res = await GetProductList(page, pageInfo.pageSize, pageInfo.sorting) as IResponseServiceModel;

    setPageInfo(GetPageInfo(res.data.total, res.data.products.length, page, pageInfo.pageSize, pageInfo.sorting));            
    setProducts(res.data.products);
    LoaderToggle(false);
  }

  const FetCategoryProduct = async (category, page) => {
    LoaderToggle(true);

    if(!page) { page = 1; }
    const res = await GetCategoryProduct(category, page, pageInfo.pageSize, pageInfo.sorting) as IResponseServiceModel;
    if(res.isSuccess)
    {
        setProducts(res.data.products);
        setPageInfo(GetPageInfo(res.data.total, res.data.products.length, page, pageInfo.pageSize, pageInfo.sorting));
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
        res = await GetCategoryProduct(category, page, pageInfo.pageSize, pageInfo.sorting);
    }
    else
    {
        res = await GetProductList(page, pageInfo.pageSize, pageInfo.sorting);
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

        setPageInfo(GetPageInfo(res.data.total, res.data.products.length, page, pageInfo.pageSize, pageInfo.sorting));            
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
        res = await GetCategoryProduct(category, page, pageInfo.pageSize, pageInfo.sorting) as IResponseServiceModel;      
      }
      else{
        res = await GetProductList(page, pageInfo.pageSize, pageInfo.sorting) as IResponseServiceModel;
    }

    removeUrlParameter('cat');
    setPageInfo(GetPageInfo(res.data.total, res.data.products.length, page, pageInfo.pageSize, pageInfo.sorting));            
    setProducts(res.data.products);
    LoaderToggle(false);
  }

  QueryProduct(1);
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

const handleSortingChanged = (e) => {
  const sortType = parseInt(e.target.value);
  pageInfo.sorting = sortType;

  FetchProduct(1);        
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

const PageChanged = (page, pageSize) => {
  if(page !== pageInfo.page){
    pageInfo.pageSize = pageSize;
    LoadMoreProduct(categorySelected, page);
  }    
}; 

  let gotData = false;
  if(products){ gotData = true; }
  const config = GetConfig(false, gotData, pageInfo);
  config.handleAddToCartClick = handleAddToCartClick;
  config.handleSortingChanged = handleSortingChanged;
  config.PageChanged = PageChanged;
  config.loadMoreOnly = true;

  return (
    <>
    <div className="lg:flex clear-both min-h-svh mt-2 mb-2">    
      <div className="float-left sm:float-none md:float-none w-full lg:w-80 h-auto min-w-80">
        <Category handleClick={categoryHandleClick} category = {category} productCount = {config.pageInfo.total}/>
      </div>
      
      <div className="float-left sm:float-none md:float-none">         
          <TopInfo products={products} pageinfo={pageInfo} config={config}/>

          <div className="flex flex-wrap justify-left float-left">
            {products && products.length > 0 ? 
            <>
              { products.map((product, i) => (<ProductItemContainer  key = {i} product={product} handleAddToCartClick={handleAddToCartClick}/>)) }
            </> : 
            <>
              { productEmptyList.map((p, i) => (<ProductItemContainerEmpty key={i}/> )) }
            </>}
          </div>

          {config.pageInfo.allowLoadMore && 
              <div className="px-1">
                {products && products.length > 0 ? <Pagination config={config}/> :  <PaginationEmpty/>}
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