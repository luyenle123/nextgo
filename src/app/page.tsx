"use client"

import { useRouter } from 'next/navigation';
import SearchBox from './components/search/searchBox';
import { MainLayout } from './layouts/main';
import * as constants from '@/app/constants'

export default function Home() {
  const route = useRouter();
  const handleSearch = async (key) => {
    route.push('/' + constants.NAV_SEARCH + '?text='+ key);
  }

  return (
    <MainLayout>
      <div className='h-700 pt-40'>
        <div className='w-full h-full'>
          <SearchBox handleSearch={handleSearch} type={2}/>
            {/* <div className='sm:w-3/4 max-w-500 h-20 my-0 mx-auto border-solid border-t border-b border-gray-300 bg-white'>              
                <div className='h-5 text-center mt-5 text-4xl font-bold text-gray-400'>
                  GO GO TEST
                </div>
            </div> */}
        </div>
      </div> 
    </MainLayout>
  );
}
