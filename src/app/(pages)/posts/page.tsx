
import { List } from "@/app/components/posts/postList";
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function PostListPage(){
  return (
    <div className=" mt-5">
      <List/>
      <SpeedInsights/>
    </div>    
  )
}