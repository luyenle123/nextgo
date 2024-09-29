import List from "@/app/components/post/list";

export default function fetchdata(){

  // const res = await fetch('https://dummyjson.com/posts');
  // const data = await res.json();
  // const posts = data.posts;

  return (
      <div className='p-100'>
        <List/>
      </div>
    
      
    // <ul>
    //   {posts.map((post) => (
    //     <li key={post.id}>{post.title}</li>
    //   ))}
    // </ul>
  )

}
