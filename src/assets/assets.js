import { Laptop, Bell ,FileText, Building2, User} from 'lucide-react'




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
  admin:[
    {
      icon: Building2 ,
      url:'/inventry',
      menu:'Office Equip'
    },
    {
      icon:Laptop,
      url:'/inventry',
      menu:'Employee Euip'
    },
    {
      icon:User,
      url:'/employee',
      menu:'Employee'
    },
    {
      icon:FileText,
      url:'/logs',
      menu:'Logs'
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
//   employee:[
//     {
//       icon:<Building2/>,
//       url:'"/inventry"',
//       menu:'Office Equip'
//     },
//     {
//       icon:<Laptop/>,
//       url:'/employee',
//       menu:'Office Equip'
//     },
//     {
//       icon:<FileText/>,
//       url:'/logs',
//       menu:'Office Equip'
//     },
//     {
//       icon:<Bell/>,
//       url:'/notification',
//       menu:'Office Equip'
//     }
//   ]
}
 