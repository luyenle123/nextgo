// import { List } from "@/app/components/products/productList";
import React, { Suspense } from "react";
import { SpeedInsights } from '@vercel/speed-insights/next';

const List = React.lazy(() => import('@/app/components/products/productList'));

export default function ProductListingPage(){

  console.log('>> ProductListingPage');

  return (
    <div className="min-h-800" id="product-listing-container">
      <Suspense>
        <List/> 
      </Suspense>
      <SpeedInsights />
    </div>
  )
}