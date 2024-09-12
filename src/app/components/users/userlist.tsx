'use client'

import { GetUserList } from "@/app/services/userService";
import { useEffect, useState } from "react";
import { IResponseServiceModel } from "@/app/models/responseModel";
import Image from "next/image";
import { LoaderToggle } from "@/app/components/loader/loader";
import { IUserItem } from "@/app/models/usermodel";

const List = () => {
    const [users, setUsers] = useState<IUserItem[] | undefined>(undefined);

    useEffect(() => {
        async function fetchPosts() {                
            const res = await GetUserList(1, 50) as IResponseServiceModel;

            setUsers(res.data.users);
            LoaderToggle(false);
        }

        LoaderToggle(true);
        fetchPosts();
    }, []);

  if(!users){
    return(<></>);
  }

  return (
    <>
        <div className="flex flex-wrap justify-center">
          {users.map((user, i) => (
                  <div key={i} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 2xl:w-1/6">
                    <div className="productcard-min-h-300 border-gray-300 border-solid border rounded m-1 p-2">
                        <p>{user.firstName} {user.lastName}</p>
                        <p>{user.email}</p>
                        <div className="w-32 mx-auto my-0 mt-5">
                            <Image src={user.image} alt={user.firstName} width={128} height={128}/>  
                        </div>
                    </div>
                  </div>
              ))}
        </div>
    </>
  )
}

export { List }