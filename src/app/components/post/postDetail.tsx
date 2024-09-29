'use client'

import { IPostItem } from "@/app/models/postmodel";
import { GetPostDetail } from "@/app/services/postService";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IResponseServiceModel } from "@/app/models/responseModel";

const Detail = ({id}) => {
  const [post, setPost] = useState<IPostItem | undefined>(undefined); 
  const [isLoading, setIsLoading] = useState(false);

  // const searchParams = useSearchParams();
  // const id = searchParams.get('id');  

  useEffect(() => {
      async function fetchPosts() {                
        const res = await GetPostDetail(id)as IResponseServiceModel;

        setPost(res.data);
        setIsLoading(false);
      }

      setIsLoading(true);
      fetchPosts();
  }, [id]);

  if(isLoading){  
    return(<></>);
  }

  return (
    <div className="py-5">
      <div className="mb-5">
        <Link href={'/posts'} className="text-gray-500 font-bold">&lt; Back</Link>
      </div>        
 
      {!post || !post.id || post.id<=0 ? 
        <>
          <div className="text-center text-xl my-5 font-bold">
            NOT FOUND
          </div>        
        </>
        :
        <>
          <p>{post.id}</p>
          <p className="font-bold">{post.title}</p>
          <p>{post.body}</p>        
        </>
       }


    </div>
  )
}

export { Detail }