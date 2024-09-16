// import CartPageDetail from "@/app/components/cart/cartdetail";
import React, { Suspense } from "react";


const CartPageDetail = React.lazy(() => import('@/app/components/cart/cartdetail'));

export default function CartDetailPage(){
  return (
    <Suspense>
      <CartPageDetail/>
    </Suspense>    
  )
}