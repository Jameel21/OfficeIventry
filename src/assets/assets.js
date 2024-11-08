import { Laptop, Bell ,FileText, Building2} from 'lucide-react'




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
      icon: '<Building2/>' ,
      url:'/inventry',
      menu:'Office Equip'
    },
    {
      icon:'<Laptop/>',
      url:'/employees',
      menu:'Employee Euip'
    },
    {
      icon:'<FileText/>',
      url:'/logs',
      menu:'Logs'
    },

    {
      icon:'<Bell/>',
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
 