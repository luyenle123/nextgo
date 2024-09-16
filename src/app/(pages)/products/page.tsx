// import { List } from "@/app/components/products/productList";
import React, { Suspense } from "react";

const List = React.lazy(() => import('@/app/components/products/productList'));

export default function ProductListingPage(){
  return (
    <div className="min-h-800" id="product-listing-container">
      <Suspense>
        <List/> 
      </Suspense>      
    </div>
  )
}