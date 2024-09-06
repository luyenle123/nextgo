
export default async function fetchdata(){

    const data = await fetch('https://api.vercel.app/blog')
    const posts = await data.json()    

  return (
    <>
        <ul>
        {posts.map((x:any) => (
            <li key={x.id}>{x.title}</li>
        ))}
        </ul>    
    </>
  )

}
