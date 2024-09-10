import { LayoutProps } from '@/app/models/index'

export function LoginLayout({children}: LayoutProps){
  return (
    <>
      <div id="main-container">
        {children}
      </div>   
    </>
  )
}
