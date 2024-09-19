// import type { InferGetStaticPropsType, GetStaticProps } from 'next'
 
// type Repo = {
//   name: string
//   stargazers_count: number
// }
 
// export const getData = (async () => {
//   console.log('>> getData');
//   const res = await fetch('https://dummyjson.com/products')
//   const repo = await res.json()
//   return { props: { repo } }
// }) satisfies GetStaticProps<{
//   repo: Repo
// }>
 
// export default function Page({
//   repo
// }: InferGetStaticPropsType<typeof getData>) {
//   return(
//   <>
//     DATA: {JSON.stringify(repo)}
//   </>
//   );
// }


// import { GetServerSideProps } from 'next';
// import React from 'react'
// import { IResponseServiceModel } from "@/app/models/responseModel";

// import { GetStaticProps } from "next";

// function TestPage({props}) //: InferGetServerSidePropsType<typeof getServerSideProps>) 
// {
//   console.log('>> TestPage');
//   return (
//     <div>
//       <p>DATA: {JSON.stringify(props)}</p>
//     </div>
//   )
// }

// export default TestPage;

// TestPage.getStaticProps = async() => {
//   console.log('>> getStaticProps');
//   const res = await fetch('https://dummyjson.com/products')
//   const productJson = await res.json() ;//as IResponseServiceModel

//   return {
//     props: {
//       products: productJson
//     }
//   }
// }

import React from 'react'

export default function Page(){
  return (
    <div>page</div>
  )
}
