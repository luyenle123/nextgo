'use client'

import { GetPostList } from "@/app/services/postService";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IResponseServiceModel } from "@/app/models/responseModel";

export default function BuildPostList(){
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
      async function fetchPosts() {                
          const res = await GetPostList(1, 20, 1) as IResponseServiceModel;

          setPosts(res.data.posts);
          setIsLoading(false);
      }

      setIsLoading(true);
      fetchPosts();
  }, []);

  if(isLoading){
    return(<>Fetch Post</>);
  }

  return (
    <>
        <ul className="my-5 min-h-svh">
            {posts.map((post, i) => (
                <li key={i} className="cursor-pointer px-5 hover:bg-gray-200">
                  <Link href={'/posts/'+post.id}>
                    {i+1}. {post.title}
                  </Link>
                </li>
            ))}
        </ul>        
    </>
  );
}