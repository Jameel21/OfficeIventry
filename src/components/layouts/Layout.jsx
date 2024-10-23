import React from 'react'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import Sidebar from './_utils/sideBar/Sidebar'





const Layout = () => {
  return (
    <div >
        
      <SidebarProvider>
            <Sidebar/>
            <div>
            <SidebarTrigger />
           </div>
        </SidebarProvider> 
    </div>
  )
}

export default Layout
