'use client'

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";


const List = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        async function fetchPosts() {                
            const res = await fetch('https://dummyjson.com/posts');
            const data = await res.json();

            setPosts(data.posts);
            setIsLoading(false);
        }

        setIsLoading(true);
        fetchPosts();
    }, []);


  const handleClick = (id) => {
    router.push('/post/detail?id='+id);
    // router.push({
    //   pathname: '/post/detail/[postid]',
    //   query: { postid: id }
    // });
  }

  if(isLoading){
    return(<p>Loading...</p>);
  }

  return (
    <>
        <Link href={'/'} className="text-gray-500 font-bold">&lt; Home</Link>

        <ul className="my-5">
            {posts.map((post, i) => (
                <li onClick={() => handleClick(post.id)} key={i} className="cursor-pointer px-5 hover:bg-gray-300">{i+1}. {post.title}</li>
            ))}
        </ul>        
    </>
  )
}

export interface PostItem{
  id: 0, 
  title: '', 
  body: ''
}

const Detail = () => {
  const [post, setPost] = useState({id: 0, title: '', body: ''}); //{id: 0, title: '', body: ''}
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();
 
  const id = searchParams.get('id');  

  useEffect(() => {
      async function fetchPosts() {                
          const res = await fetch('https://dummyjson.com/posts/'+id);
          const data = await res.json();

          setPost(data);
          setIsLoading(false);
      }

      setIsLoading(true);
      fetchPosts();
  }, [id]);

  if(isLoading){  
    return(<p>Loading...</p>);
  }

  return (
    <div className="py-5">
      <div className="mb-5">
        <Link href={'/post/list'} className="text-gray-500 font-bold">&lt; Back</Link>
      </div>        
 
        <p>{post.id}</p>
        <p>{post.title}</p>
        <p>{post.body}</p>
    </div>
  )
}

export { List, Detail }