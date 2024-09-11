/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { GetProductList, GetCategoryProduct } from "@/app/services/productService";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IResponseServiceModel } from "@/app/models/responseModel";
import Image from "next/image";
import { LoaderToggle } from "@/app/components/loader/loader";
import { IProductItem } from "@/app/models/productmodel";
import { Pagination, GetConfig, CloneConfig } from '@/app/components/pagination/pagination'
import { GetPageInfo } from "@/app/components/pagination/paginationUtils";
import { Category, UpdateCategoryProductCount } from "@/app/components/products/category";
import { toast } from 'react-toastify';
import { DoAddToCart, UpdateCartInfo } from "@/app/components/cart/cart";

const List = () => {
    const [products, setProducts] = useState<IProductItem[] | undefined>(undefined);
    const [pageinfo, setPageInfo] = useState({page:1, pageSize:12, sorting:1, totalPage:1});
    const [categorySelected, setCategorySelected] = useState();

    let fetchProduct = false;

    //console.log('>> product list> ' + 'pageinfo: ' + pageinfo.totalPage + ' / product:' + products?.length);

    const FetchProduct = async (page:number) => {
      if(categorySelected && !fetchProduct){
        FetCategoryProduct(categorySelected, page);
        return;
      }      

      LoaderToggle(true);
      const res = await GetProductList(page, pageinfo.pageSize, 1) as IResponseServiceModel;

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

  useEffect(() => {
    LoaderToggle(true);
    FetchProduct(1);
  }, []);


  if(!products){
    return(<p>Loading...</p>);
  }

  const handleSortingChanged = (e) => {
    // console.log(e.target.value);
    // var sortType = parseInt(e.target.value);
    // var obj = pageinfo;
    // obj.sorting = sortType;
    // setPageInfo(obj);

    // queryData(1);        
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

const updateStatus = (b) => {
  LoaderToggle(false);
  UpdateCartInfo(null, 1);
}
const handleAddToCartClick = (product) => {
  LoaderToggle(true);
  const productId = product.id;
  DoAddToCart(productId, product.sku, updateStatus);
};

const handleItemDisplayChanged = (e) => {
  const newPageSize = parseInt(e.target.value);
  const obj = pageinfo;
  obj.pageSize = newPageSize;
  setPageInfo(obj);

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

  let gotData = false;
  if(products){ gotData = true;}
  const config = GetConfig(false, gotData, pageinfo);
  config.handlePaginationNumberClick = handlePaginationNumberClick;
  config.handleBackClick = handleBackClick;
  config.handleNextClick = handleNextClick;
  config.handleAddToCartClick = handleAddToCartClick;
  config.handleItemDisplayChanged = handleItemDisplayChanged;
  config.handleSortingChanged = handleSortingChanged;
  config.hideSortOption = true;
  config.hideSortOption = true;
  config.hideDisplayPageInfo = true;
  config.hideDisplayOption = true;
  config.hidePageDropDownInfo = true;

  const config1 = CloneConfig(config);

  return (
    <>
    <div className="lg:flex clear-both min-h-svh">

      <div className="float-left sm:float-none md:float-none w-full lg:w-80 h-auto min-w-80 bg-gray-100">
        <Category handleClick={categoryHandleClick}/>
      </div>
      
      <div className="float-left sm:float-none md:float-none">
        {products && products.length > 0 ? 
        <>
          <div className="m-1">
            {config.hasData && <Pagination config={config}/>}
          </div>
        </> : <></>}        
          
          <div className="flex flex-wrap justify-left">
            {products.map((product, i) => (
              <ProductItem  key = {i} product={product} handleAddToCartClick={handleAddToCartClick}/>
            ))}
          </div>

        {products && products.length > 0 ? 
        <>
          <div className="m-1 float-right">
            {config.hasData && <Pagination config={config1}/>}
          </div>
        </> : <></>}
      </div>
      
    </div> 

    </>
  )
}

export function ProductItem({product, handleAddToCartClick}){
  return(
    <>
      <div className="w-full sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/3 2xl:w-1/4 relative">
        <div className="productcard-min-h-460 border-gray-300 border-solid border rounded m-1 p-2">

          <div className="w-60 mx-auto my-0 mt-5">
            <Link href={'/products/'+product .id} className="font-bold">
              <Image src={product .thumbnail} alt={product .title} width={200} height={200}/>  
            </Link>                        
          </div>

          <Link href={'/products/'+ product .id} className="font-bold">
            {product .sku}
          </Link>

          <p>{product .title}</p>
          <p>{product .description}</p>
          <p>{product .category}</p>

          <p className="text-right">Instock({product .stock})</p>
          <p className="text-right font-bold text-lg">{product .price} $</p>

          <div className="absolute bottom-0 mb-3">
            <button onClick={() => handleAddToCartClick(product )} className="py-1 px-4 text-gray-500 bg-slate-200 hover:bg-slate-300 active:bg-slate-200 border-slate-300 border-solid border rounded">Add To Cart</button>
          </div>
        </div>
      </div>    
    </>
  );
}

export { List }