import { sidebarMenu } from '@/assets/assets';
import React from 'react';
import {  Link } from 'react-router-dom'
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
import User from './User';


const DemoSidebar = ( ) => {

    const {toggleSidebar,
            isMobile,
            setOpenMobile,
             isOpen     }= useSidebar();
   const role = "admin";
    let option; 
    switch (role) { 
      case "admin": 
      option = sidebarMenu.admin; 
      break; 
      case "hr": 
      option = sidebarMenu.hr; 
      break; 
      default: 
      option = sidebarMenu.employee; 
      break;
    }
  

  
  return (
    <div>
      <Sidebar collapsible='icon'>
       <SidebarContent>
       <SidebarGroup>
        <User/>
       <SidebarGroupLabel className="mb-4 text-xl" >Menu</SidebarGroupLabel>
       <SidebarGroupContent>
         <SidebarMenu >
        
                     {option.map((option,index)=>(
                    <Link key={index} to={option.url}>
                    <SidebarMenuItem  >
                    <SidebarMenuButton>
                    <option.icon /><span>{option.menu }</span> 
                    </SidebarMenuButton>
                    </SidebarMenuItem> 
                    </Link>)) }
                    </SidebarMenu>
               </SidebarGroupContent>    
            </SidebarGroup>      
         </SidebarContent>     
       </Sidebar>
    </div>
  );
}

export default DemoSidebar;
