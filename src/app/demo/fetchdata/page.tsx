import { List } from "@/app/components/Posts";

export default function fetchdata(){

  // const res = await fetch('https://dummyjson.com/posts');
  // const data = await res.json();
  // const posts = data.posts;

  return (
    <List/>
    // <ul>
    //   {posts.map((post) => (
    //     <li key={post.id}>{post.title}</li>
    //   ))}
    // </ul>
  )

}
