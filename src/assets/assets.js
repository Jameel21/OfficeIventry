import { Lock, Bell ,FileText, Building2, User, GitPullRequestArrow,Monitor,Paintbrush,SquareCheckBig,UserRoundPen,CirclePlus, Plus} from 'lucide-react'


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
  superadmin:[
    {
      icon: Lock ,
      url:'/admin',
      menu:'Dashboard'
    },
    {
      icon:Building2,
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
        // {
        //   icon:GitPullRequestArrow,
        //   url:'/admin/menu',
        //   menu:'Menu'
        // },
      ]
    },
    {
      icon:Building2,
      menu:'Inventry',
      submenu: [
        {
          icon:Monitor,
          url:'/admin/officeEquipment',
          menu:'Office Equipment'
        },
        {
          icon:GitPullRequestArrow,
          url:'/admin/employeeEquipment',
          menu:'Employee Equipment'
        },
      ]
    },
    {
      icon:UserRoundPen,
      menu:'User',
      submenu: [
        {
          icon:FileText,
          url:'/admin/viewAllUser',
          menu:'Add User'
        },
      ]
    },
    {
      icon:CirclePlus,
      menu:'Request',
      submenu: [
        {
          icon:Plus,
          url:'/viewRequest',
          menu:'My Request'
        },
        {
          icon:GitPullRequestArrow,
          url:'/admin/pendingRequests',
          menu:'All Request'
        },
        // {
        //   icon:BadgeCheck,
        //   url:'/admin/updatedRequests',
        //   menu:'Updated Request'
        // },
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
          icon:Paintbrush,
          url:'/admin/maintenanceLog',
          menu: 'Maintenance Log'
        },
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
employee:[
  {
    icon:User,
    menu:'Request',
    submenu: [
      {
        icon:Monitor,
        url:'/viewEmployee',
        menu:'Add Request'
      },
    ]
  },
  {
    icon:FileText,
    menu:'Logs',
    submenu:[
      {
        icon:User,
        url:'/viewEmployee',
        menu: 'Request Log'
      }]
  },

  {
    icon:Bell,
    url:'/notification',
    menu:'Notification'
  },
 
],
}
 