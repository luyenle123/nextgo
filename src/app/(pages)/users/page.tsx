// import { List } from "@/app/components/users/userlist";

import { SpeedInsights } from '@vercel/speed-insights/next';
import React from 'react';

const List = React.lazy(() => import('@/app/components/users/userlist'));

export default function UserListPage(){
  return (
    <div className="min-h-svh">
      <List/>
      <SpeedInsights/>
    </div>    
  )
}
