 import { instance } from "@/helper/axios"
 import { useMutation } from "@tanstack/react-query"
 import { useQuery } from "@tanstack/react-query"


 export const useEqipmentAddHooks =()=>{
     return useMutation({ mutationFn: async(formData) => {
     await instance.post('/equip',formData)}     
   }
 )
 
 }  
      
 export const useEqipmentEditHooks = ()=>{
    return useMutation({mutationFn: async(formData)=> await instance.put(`/equip/${data.id}`,formData)})
 }

 export const useEqipmentDeleteHooks = ()=>{
    return useMutation({mutationFn: async(formData)=> await instance.delete(`/equip/${data.id}`,formData)})
 }
 export const useEqipmentgetHooks = (formData) =>{
     return useQuery({ queryKey:['equip'],queryFn:async()=> {
              return  await instance.get('/equip')}
    
})
 }