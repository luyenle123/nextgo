
import List from "@/app/components/posts/list";
// import BuildPostList from "@/app/components/posts/BuildPostList";
// import { SpeedInsights } from '@vercel/speed-insights/next';
// import { Suspense } from "react";
// import dynamic from "next/dynamic";

// const BuildPostList = dynamic(() => import('@/app/components/posts/BuildPostList'), { loading: () => <><p className="mt-20">Loading...</p></>})

export default function PostListPage(){
  return (
    <div className="mt-5">
      {/* <Suspense fallback = {<p className="mt-20">Loading...</p>}>
        <BuildPostList/>
      </Suspense> */}
        <List/> 
    </div>    
  )
}