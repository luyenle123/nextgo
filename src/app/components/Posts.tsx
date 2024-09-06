'use client'

import Link from "next/link";
import { useEffect, useState } from "react";


const List = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    // const router = useRouter();

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


  // const handleClick = (id) => {
  //   router.push('/post/detail?id='+id);
  // }

  if(isLoading){
    return(<p>Loading...</p>);
  }

  return (
    <>
        <Link href={'/'} className="text-gray-500 font-bold">&lt; Home</Link>
        <ul className="my-5 w-1/3">
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

export interface PostItem{
  id: 0, 
  title: '', 
  body: '',
  tags: [],
  reactions: { likes: 0, dislikes: 0 },
  views: 0,
  userId: 0
}

const Detail = ({id}) => {
  const [post, setPost] = useState<PostItem | undefined>(undefined); 
  const [isLoading, setIsLoading] = useState(false);

  // const searchParams = useSearchParams();
  // const id = searchParams.get('id');  

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

export { List, Detail }