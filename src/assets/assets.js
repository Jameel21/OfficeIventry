import { Lock, Bell ,FileText, Building2, User, BadgeCheck, GitPullRequestArrow,Monitor,Paintbrush,SquareCheckBig} from 'lucide-react'




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
      menu:'Inventry',
      submenu: [
        {
          icon:Monitor,
          url:'/inventry',
          menu:'Office Equipment'
        },
        {
          icon:GitPullRequestArrow,
          url:'/admin/pendingRequests',
          menu:'Employee Equipment'
        },
      ]
    },
    {
      icon:User,
      menu:'Employee',
      submenu: [
        {
          icon:Monitor,
          url:'/viewEmployee',
          menu:'Equipment'
        },
        {
          icon:GitPullRequestArrow,
          url:'/admin/pendingRequests',
          menu:'Requests'
        },
        {
          icon:BadgeCheck,
          url:'/admin/updatedRequests',
          menu:'Updated'
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
          menu: 'Employee'
        },
        {
          icon:Building2,
          url:'/admin/equipmentLog',
          menu: 'Equipment'
        },
        {
          icon:SquareCheckBig,
          url:'/admin/allocationLog',
          menu: 'Allocation'
        },
        {
          icon:Paintbrush,
          url:'/admin/maintenanceLog',
          menu: 'Maintenance'
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
    menu:'Employee',
    submenu: [
      {
        icon:Monitor,
        url:'/viewEmployee',
        menu:'Equipment'
      },
    ]
  },
  {
    icon:FileText,
    menu:'Logs',
    submenu:[
      {
        icon:User,
        url:'/employeeLog',
        menu: 'Employee'
      }]
  },

  {
    icon:Bell,
    url:'/notification',
    menu:'Notification'
  },
 
],
}
 