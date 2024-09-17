import React, { Suspense } from 'react'

import { SpeedInsights } from '@vercel/speed-insights/next';

const Search = React.lazy(() => import('@/app/components/search/search'));

export default function SearchPage(){
  return (
    <>
      <Suspense>
        <Search/>
      </Suspense>      
      <SpeedInsights/>
    </>
  )
}
