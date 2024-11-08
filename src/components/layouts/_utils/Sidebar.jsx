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
} from '@/components/ui/sidebar'


const DemoSidebar = ( ) => {
    
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
  
   //  const role ="admin"
   //  const option = role ==="admin"? sidebarMenu.admin 
   //                :role ==="hr"?sidebarMenu.hr
   //                :sidebarMenu.employee

  
  return (
    <div>
      <Sidebar>
       <SidebarContent>
       <SidebarGroup>
       <SidebarGroupLabel className="text-xl mb-4" >Menu</SidebarGroupLabel>
       <SidebarGroupContent>
         <SidebarMenu >
        
                     {option.map((option,index)=>(
                    <Link key={index} to={option.url}>
                    <SidebarMenuItem  >
                    <SidebarMenuButton>
                    <span>{option.icon} </span> {option.menu }
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
