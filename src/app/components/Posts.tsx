'use client'

import { useEffect, useState } from "react";


export const Posts = () => {
    const [posts, setPosts] = useState([]);
    let isLoading = false;

    useEffect(() => {
        async function fetchPosts() {                
            const res = await fetch('https://dummyjson.com/posts');
            const data = await res.json();

            setPosts(data.posts);
            isLoading = false;
        }

        isLoading = true;
        fetchPosts();
    }, []);

  if(isLoading){
    return(<p>Loading...</p>);
  }

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
