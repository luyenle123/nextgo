import { ProductDetail } from "@/app/components/products/productDetail";

export default function ProductDetailPage({ params }: { params: { productid: string } }){
  return (
      <ProductDetail id={params.productid}/>
  )
}
