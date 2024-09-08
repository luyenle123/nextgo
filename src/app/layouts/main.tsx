import { LayoutProps } from '@/app/models/index'
import React from 'react'

export function MainLayout({children}: LayoutProps){
  return (
    <html lang="en">
      <body>
          <div id="main-container">
            {children}
          </div>   
      </body>
    </html>
  )
}
