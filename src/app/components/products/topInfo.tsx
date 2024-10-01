import { SortOption } from "./sortOption";

export function TopInfo(props){
    return(
      <>
          {
            props.products && props.products.length > 0 ? 
            <div className="float-left w-full px-1">
              <div className='float-left w-20 font-bold'>
                {props.pageinfo?.total} items      
              </div>
  
              <SortOption config={props.config}/>
            </div>
            :
            <>
              <div className="float-left w-full px-1 opacity-40 blur-0">
                <div className='float-left w-20  ont-bold text-gray-200'>
                  00 items      
                </div>
  
                <SortOption config={props.config}/>
              </div>          
            </>
          }    
      </>
    );
  }