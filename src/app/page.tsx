import { MainLayout } from './layouts/main';

export default function Home() {

  //console.log('>> Home'); 

  return (
    <MainLayout>
      <div className='h-700 pt-40'>
        <div className='w-full h-full'>
            <div className='sm:w-3/4 max-w-500 h-20 my-0 mx-auto border-solid border-t border-b border-gray-300 bg-white'>
                <div className='h-5 text-center mt-5 text-4xl font-bold text-gray-400'>
                  GO GO TEST
                </div>
            </div>
        </div>
      </div> 
    </MainLayout>
  );
}
