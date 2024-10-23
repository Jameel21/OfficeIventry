import React from 'react'
import {  Link } from 'react-router-dom'
import { PrinterIcon,Laptop, LogOut, Bell ,FileText} from 'lucide-react'
import { Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,

} from '@/components/ui/sidebar'
import User from './_utiles/User'



export default function DemoSidebar(){

 
const SidebarList = [
  
    {
       topic:'Office equip',
       icon: <PrinterIcon/>,
      path:'/office-equip'
    },
    {
      topic:'Employee equip',
      icon:<Laptop/>,
      path:'/employee-equip'
    },
    {
      topic:'Logs',
      icon:<FileText/>,
     path:'/logs'
    },
    {
      topic:'Notification',
      icon:<Bell/>,
       path:'/notification'
    },
    {
      topic:'Logout',
      icon:<LogOut/>,
      path:'/login' 
    }
  
  
  ]
  

 
    return(
     
      <div className=' md:w-1/4 h-[100vh] fixed' >
       
        <div>
        <Sidebar side="left" variant="floating"  >
          <User/>
       <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xl mb-4" >Menu</SidebarGroupLabel>
          
          <SidebarGroupContent>
           {SidebarList.map((list,index) => (
            <SidebarMenu key={index}>
                 <Link to={list.path}>
                <SidebarMenuItem >
                 
                  <SidebarMenuButton>
                    {list.icon} {list.topic} 
                  </SidebarMenuButton>
                 
                </SidebarMenuItem> 
                </Link> 
                </SidebarMenu>
              ))}
            
          </SidebarGroupContent>
          
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
    </div>
    </div>
)}
 