import { Suspense } from "react";
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function Page({ params }: { params: { postid: string } }) {

    return(
        <>
            <div className="text-xl text-center my-5">
                Detail Page
            </div>
            <Suspense>
                <div id = {params.postid}/>
            </Suspense>

            <SpeedInsights/>
        </>
    );
  }