import React from 'react'
import { SidebarProvider } from '@/components/ui/sidebar';
import Sidebar from './_utils/sideBar/Sidebar'




const Layout = () => {
  return (
    <div>
        
      <SidebarProvider>
            <Sidebar/>
        </SidebarProvider>
    </div>
  )
}

export default Layout
