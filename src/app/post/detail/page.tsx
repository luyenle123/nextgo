import { Detail } from "@/app/components/Posts";
import { Suspense } from "react";

export default function PostDetail(){
  return (
    <Suspense>
      <Detail/>
    </Suspense>        
  )
}