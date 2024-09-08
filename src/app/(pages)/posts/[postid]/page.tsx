import { Detail } from "@/app/components/posts/postDetail";
import { Suspense } from "react";

export default function Page({ params }: { params: { postid: string } }) {

    return(
        <>
            <div className="text-xl text-center my-5">
                Detail Page
            </div>
            <Suspense>
                <Detail id = {params.postid}/>
            </Suspense>          
        </>
    );
  }