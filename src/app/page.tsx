"use client"

import { useRouter } from 'next/navigation';
import SearchBox from './components/search/searchBox';
import { MainLayout } from './layouts/main';
import * as constants from '@/app/constants'
import CategoryBlock from '@/app/components/blocks/categoryblock';
import Twocolumnblock from '@/app/components/blocks/twocolumnblock';
import Threecolumnblock from '@/app/components/blocks/threecolumnblock';

export default function Home() {
  const route = useRouter();
  const handleSearch = async (key) => {
    route.push('/' + constants.NAV_SEARCH + '?text='+ key);
  }

  return (
    <MainLayout>
      <div className='h-700'>
        <div className='w-full -mt-32 absolute'>
          <SearchBox handleSearch={handleSearch} type={2}/>
        </div>
        <div className='w-full h-full pb-5'>
          <CategoryBlock/>

          <Twocolumnblock/>

          <Threecolumnblock/>

        </div>
      </div> 
    </MainLayout>
  );
}
