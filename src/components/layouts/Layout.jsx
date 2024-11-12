import React from 'react'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

import { Outlet } from 'react-router-dom';
import DemoSidebar from './_utils/Sidebar';






const Layout = () => {
  return (
    <div className='flex' >
        <div className=' md:w-[300px]'>       
            <SidebarProvider>
                <main>
               <SidebarTrigger  className='text-primary h-11'/>
               <DemoSidebar/>
               </main>
            </SidebarProvider> 
    </div>
    <div className='md: w-[calc(100%-300px)]  p-9 '>
        <Outlet/>
    </div>
</div> 
 )
}
export default Layout
