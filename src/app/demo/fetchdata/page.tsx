// import { Blog } from "@/app/components/Blog"

export default async function fetchdata(){

    let data = await fetch('https://api.vercel.app/blog')
    let posts = await data.json()    

  return (
    <>
        {/* <Blog/> */}
        <ul>
        {posts.map((x) => (
            <li key={x.id}>{x.title}</li>
        ))}
        </ul>    
    </>
  )

}
