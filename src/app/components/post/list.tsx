'use client'

import dynamic from "next/dynamic";

const BuildPostList = dynamic(() => import('@/app/components/post/BuildPostList'), { loading: () => <><p className="mt-20 text-red-400">Loading...</p></>})

export default function List(){
  return(
    <div className="p-0">
      <BuildPostList/>
    </div>
  );
}

// export function BuildPostList(){
//   const [posts, setPosts] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//       async function fetchPosts() {                
//           // const res = await fetch('https://dummyjson.com/posts');
//           // const data = await res.json();

//           const res = await GetPostList(1, 20) as IResponseServiceModel;

//           setPosts(res.data.posts);
//           setIsLoading(false);
//       }

//       setIsLoading(true);
//       fetchPosts();
//   }, []);

// if(isLoading){
//   return(<></>);
// }

// return (
//   <>
//       <ul className="my-5 min-h-svh">
//           {posts.map((post, i) => (
//               <li key={i} className="cursor-pointer px-5 hover:bg-gray-200">
//                 <Link href={'/posts/'+post.id}>
//                   {i+1}. {post.title}
//                 </Link>
//               </li>
//           ))}
//       </ul>        
//   </>
// )
// }

// export { List }