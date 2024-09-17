import { List } from "@/app/components/users/userlist";

import { SpeedInsights } from '@vercel/speed-insights/next';

export default function UserListPage(){
  return (
    <div className="min-h-svh">
      <List/>
      <SpeedInsights/>
    </div>    
  )
}
