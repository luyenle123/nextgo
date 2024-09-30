/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { GetUserList } from "@/app/services/userService";
import { useEffect, useState } from "react";
import { IResponseServiceModel } from "@/app/models/responseModel";
import { LoaderToggle } from "@/app/components/loader/loader";
import { IUserItem } from "@/app/models/usermodel";
import { GetConfig, Pagination } from "../pagination/pagination";
import { GetPageInfo } from "../pagination/paginationUtils";

export default function List(){
    const [users, setUsers] = useState<IUserItem[] | undefined>(undefined);
    const [pageInfo, setPageInfo] = useState({page:1, pageSize:9, sorting:1, totalPage:1});  
    
    const FetchUsers = async(page) => {  
      LoaderToggle(true);              
      const res = await GetUserList(page, pageInfo.pageSize) as IResponseServiceModel;
      
      setUsers(res.data.users);
      setPageInfo(GetPageInfo(res.data.total, res.data.users.length, page, pageInfo.pageSize, pageInfo.sorting));
      LoaderToggle(false);
  }    

  useEffect(() => {
      async function QueryUsers() {                
        const res = await GetUserList(1, pageInfo.pageSize) as IResponseServiceModel;
    
        setUsers(res.data.users);
        setPageInfo(GetPageInfo(res.data.total, res.data.users.length, 1, pageInfo.pageSize, pageInfo.sorting));
        LoaderToggle(false);
      }

      LoaderToggle(true);
      QueryUsers();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if(!users){
    return(<></>);
  }

  const PageChanged = (page, pageSize) => {
    const pnumber = parseInt(page);
    const psizenumber = parseInt(pageSize);

    if(pnumber !== pageInfo.page){
        pageInfo.pageSize = psizenumber;
        FetchUsers(pnumber);
        return;
    }

    if(psizenumber !== pageInfo.pageSize){
        pageInfo.pageSize = psizenumber;
        FetchUsers(1);
        return;
    }
};  

  let gotData = false;
  if(users){ gotData = true;}
  const config = GetConfig(false, gotData, pageInfo);
  config.hideSortOption = true;
  config.hideTotalItem = true;
  config.hideDisplayOption = true;
  config.hidePageDropDownInfo = true;
  config.hideDisplayPageInfo = true;
  config.PageChanged = PageChanged;

  return (
    <div className="w-full md:px-40 xl:px-96 justify-center my-2">
        {users && users.length > 0 ? <div className='px-1'><Pagination config={config}/> </div> : <></>} 

        <div className="flex flex-wrap w-full">
          {users.map((user, i) => (
                  <div key={i} className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3">
                    <div className="h-96 border-gray-300 border-solid border rounded m-1 p-2">
                        <p>{user.firstName} {user.lastName}</p>
                        <p>{user.email}</p>
                        <div className="w-32 mx-auto my-0 mt-5">
                            {/* <Image src={user.image} alt={user.firstName} width={100} height={100}/> */}
                        </div>
                    </div>
                  </div>
              ))}
        </div>
    </div>
  )
}

export { List }