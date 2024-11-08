import React from 'react'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

import { Outlet } from 'react-router-dom';
import DemoSidebar from './_utils/Sidebar';
//import SideBarDemo from '../form-fields/_utils/SideBarDemo';





const Layout = () => {
  return (
    <div className='flex' >
        <div className='w-[300px]'>
            <SidebarProvider>
            <SidebarTrigger/>
               <DemoSidebar/>
            </SidebarProvider> 
    </div>
    <div className=' w-[calc(100%-300px)]  p-9'>
        <Outlet/>
    </div>


</div> 
 )
}

export default Layout
