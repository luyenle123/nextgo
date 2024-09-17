import { Search } from '@/app/components/search/search'
import React from 'react'

import { SpeedInsights } from '@vercel/speed-insights/next';

export default function SearchPage(){
  return (
    <>
      <Search/>
      <SpeedInsights/>
    </>
  )
}
