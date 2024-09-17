import { ProductDetail } from "@/app/components/products/productDetail";
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function ProductDetailPage({ params }: { params: { productid: string } }){
  return (
      <>
        <ProductDetail id={params.productid}/>
        <SpeedInsights/>      
      </>
  )
}
