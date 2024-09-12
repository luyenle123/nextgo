'use client'

import { GetPostList } from "@/app/services/postService";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IResponseServiceModel } from "@/app/models/responseModel";

const List = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchPosts() {                
            // const res = await fetch('https://dummyjson.com/posts');
            // const data = await res.json();

            const res = await GetPostList(1, 20) as IResponseServiceModel;

            setPosts(res.data.posts);
            setIsLoading(false);
        }

        setIsLoading(true);
        fetchPosts();
    }, []);

  if(isLoading){
    return(<></>);
  }

  return (
    <>
        <ul className="my-5 w-1/2 min-h-svh">
            {posts.map((post, i) => (
                <li key={i} className="cursor-pointer px-5 hover:bg-gray-200">
                  <Link href={'/posts/'+post.id}>
                    {i+1}. {post.title}
                  </Link>
                </li>
            ))}
        </ul>        
    </>
  )
}

export { List }