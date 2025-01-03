import { Lock, Bell ,FileText, Building2, User, GitPullRequestArrow,Monitor,Paintbrush,SquareCheckBig,UserRoundPen,CirclePlus, Plus, Logs, LayoutDashboard} from 'lucide-react'


export  const currentStatus = [
     {
       value:'available',
       label:'Available'
         },
         {
          value:'in-use',
          label:'In Use'
         },
         {
          value:'in-maitanance',
          label:'In Maintanance'
         }

]

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
          icon:Monitor,
          url:'/admin/department',
          menu:'Department'
        },
        {
          icon:GitPullRequestArrow,
          url:'/admin/role',
          menu:'Role'
        },
        {
          icon:Monitor,
          url:'/admin/brand',
          menu:'Brand'
        },
        {
          icon:GitPullRequestArrow,
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
          icon:Monitor,
          url:'/admin/officeequipment',
          menu:'Office Equipment'
        },
        {
          icon:GitPullRequestArrow,
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
        // {
        //   icon:Paintbrush,
        //   url:'/admin/maintenanceLog',
        //   menu: 'Maintenance Log'
        // },
      ]
    },
    {
      icon:Bell,
      url:'/notification',
      menu:'Notification'
    },
   
  ],

//   hr:[ {
//     icon:<Building2/>,
//     url:'"/inventry"',
//     menu:'Office Equip'
//   },
//   {
//     icon:<Laptop/>,
//     url:'/employee',
//     menu:'Office Equip'
//   },
//   {
//     icon:<FileText/>,
//     url:'/logs',
//     menu:'Office Equip'
//   },
//   {
//     icon:<Bell/>,
//     url:'/notification',
//     menu:'Office Equip'
//   }

//   ],
Employee:[
  {
    icon:User,
    menu:'Request',
    submenu: [
      {
        icon:Monitor,
        url:'/viewMyRequest',
        menu:'Add Request'
      },
    ]
  },
  {
    icon:Bell,
    url:'/notification',
    menu:'Notification'
  },
 
],
}
 