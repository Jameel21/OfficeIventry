
import { Lock, Bell ,FileText, Building2, User, GitPullRequestArrow,SquareCheckBig,UserRoundPen,CirclePlus, Plus, Logs, LayoutDashboard, ChartColumnStacked, Bitcoin, FileUser, BellElectric, Laptop, Cable} from 'lucide-react'


export const sidebarMenu ={
  SuperAdmin:[
    {
      icon: Lock ,
      url:'/admin',
      menu:'Dashboard'
    },
    {
      icon:LayoutDashboard,
      menu:'Masters',
      submenu: [
        {
          icon:BellElectric,
          url:'/admin/department',
          menu:'Department'
        },
        {
          icon:FileUser,
          url:'/admin/role',
          menu:'Role'
        },
        {
          icon:Bitcoin,
          url:'/admin/brand',
          menu:'Brand'
        },
        {
          icon:ChartColumnStacked,
          url:'/admin/category',
          menu:'Category'
        },
      ]
    },
    {
      icon:Building2,
      menu:'Inventry',
      submenu: [
        {
          icon:Cable,
          url:'/admin/officeequipment',
          menu:'Office Equipment'
        },
        {
          icon:Laptop,
          url:'/admin/employeeequipment',
          menu:'Employee Equipment'
        },
      ]
    },
    {
      icon:UserRoundPen,
      url: '/admin/viewAllUser',
      menu:'User',
    },
    {
      icon:CirclePlus,
      menu:'Request',
      submenu: [
        {
          icon:Plus,
          url:'/viewMyRequest',
          menu:'My Request'
        },
        {
          icon:GitPullRequestArrow,
          url:'/admin/requests',
          menu:'All Request'
        },
      ]
    },
    {
      icon:FileText,
      menu:'Logs',
      submenu:[
        {
          icon:User,
          url:'/admin/employeeLog',
          menu: 'Employee Log'
        },
        {
          icon:Building2,
          url:'/admin/equipmentLog',
          menu: 'Equipment Log'
        },
        {
          icon:SquareCheckBig,
          url:'/admin/allocationLog',
          menu: 'Allocation Log'
        },
        {
          icon:Logs,
          url:'/admin/requestLog',
          menu: 'Request Log'
        },
      ]
    },
    {
      icon:Bell,
      url:'/notification',
      menu:'Notification'
    },
  ],
  // Employee:[
  //   {
  //     icon:LayoutDashboard,
  //     menu:'Masters',
  //     submenu: [
  //       {
  //         icon:BellElectric,
  //         url:'/admin/department',
  //         menu:'Department'
  //       },
  //       {
  //         icon:FileUser,
  //         url:'/admin/role',
  //         menu:'Role'
  //       },
  //       {
  //         icon:Bitcoin,
  //         url:'/admin/brand',
  //         menu:'Brand'
  //       },
  //       {
  //         icon:ChartColumnStacked,
  //         url:'/admin/category',
  //         menu:'Category'
  //       },
  //     ]
  //   },
  //   {
  //     icon:Building2,
  //     menu:'Inventry',
  //     submenu: [
  //       {
  //         icon:Cable,
  //         url:'/admin/officeequipment',
  //         menu:'Office Equipment'
  //       },
  //       {
  //         icon:Laptop,
  //         url:'/admin/employeeequipment',
  //         menu:'Employee Equipment'
  //       },
  //     ]
  //   },
  //   {
  //     icon:UserRoundPen,
  //     url: '/admin/viewAllUser',
  //     menu:'User',
  //   },
  //   {
  //     icon:CirclePlus,
  //     menu:'Request',
  //     submenu: [
  //       {
  //         icon:Plus,
  //         url:'/viewMyRequest',
  //         menu:'My Request'
  //       },
  //       {
  //         icon:GitPullRequestArrow,
  //         url:'/admin/requests',
  //         menu:'All Request'
  //       },
  //     ]
  //   },
  //   {
  //     icon:FileText,
  //     menu:'Logs',
  //     submenu:[
  //       {
  //         icon:User,
  //         url:'/admin/employeeLog',
  //         menu: 'Employee Log'
  //       },
  //       {
  //         icon:Building2,
  //         url:'/admin/equipmentLog',
  //         menu: 'Equipment Log'
  //       },
  //       {
  //         icon:SquareCheckBig,
  //         url:'/admin/allocationLog',
  //         menu: 'Allocation Log'
  //       },
  //       {
  //         icon:Logs,
  //         url:'/admin/requestLog',
  //         menu: 'Request Log'
  //       },
  //     ]
  //   },
  //   {
  //     icon:Bell,
  //     url:'/notification',
  //     menu:'Notification'
  //   },
  // ],
}
 