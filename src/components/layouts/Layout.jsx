import React from 'react'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import Sidebar from './_utils/sideBar/Sidebar'
import { Outlet } from 'react-router-dom';





const Layout = () => {
  return (
    <div className='flex' >
        <div className='w-[300px]'>
            <SidebarProvider>
               <Sidebar/>
               <SidebarTrigger/>
            </SidebarProvider> 
    </div>
    <div className=' w-[calc(100%-300px)]  p-9 bg-slate-200'>
        <Outlet/>
    </div>


</div> 
 )
}

export default Layout
