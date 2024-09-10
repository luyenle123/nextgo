import { LayoutProps } from '@/app/models/index'

export function MainLayout({children}: LayoutProps){
  return (
    <>
      <div id="main-container">
        {children}
      </div>   
    </>
  )
}
