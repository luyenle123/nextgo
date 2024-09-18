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
          // const res = await fetch('https://dummyjson.com/posts');
          // const data = await res.json();

          const res = await GetPostList(1, 20) as IResponseServiceModel;

          const res1 = await fetch('https://dummyjson.com/carts');
          console.log(res1);

          const res2 = await fetch('https://dummyjson.com/products');
          console.log(res2);
          
          for(let i = 0;i<100000; i++){

          }

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
)
}