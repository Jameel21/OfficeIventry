// import React from 'react';
// import {  Link } from 'react-router-dom'
// import { PrinterIcon,Laptop, Bell ,FileText} from 'lucide-react'
// import { Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
// } from '@/components/ui/sidebar'

// const SideBarDemo = () => {
//   const option =[
//     {
//       icon:<PrinterIcon/>,
//       url:'/inventry',
//       menu:'Office Equip'
//     },
//     {
//       icon:<Laptop/>,
//       url:'/employees',
//       menu:'Employee Euip'
//     },
//     {
//       icon:<FileText/>,
//       url:'/logs',
//       menu:'Logs'
//     },

//     {
//       icon:<Bell/>,
//       url:'/notification',
//       menu:'Notification'
//     },
//     ]
//   return (
//     <div>
//       <Sidebar>
//        <SidebarContent>
//        <SidebarGroup>
//        <SidebarGroupLabel className="text-xl mb-4" >Menu</SidebarGroupLabel>
//        <SidebarGroupContent>
//          <SidebarMenu >
        
//                      {option.map((option,index)=>(
//                     <Link key={index} to={option.url}>
//                     <SidebarMenuItem  >
//                     <SidebarMenuButton>
//                     {option.icon}  {option.menu }
//                     </SidebarMenuButton>
//                     </SidebarMenuItem> 
//                     </Link>)) }
//                     </SidebarMenu>
//                </SidebarGroupContent>    
//             </SidebarGroup>      
//          </SidebarContent>     
//        </Sidebar>
//     </div>
//   );
// }

// export default SideBarDemo;

