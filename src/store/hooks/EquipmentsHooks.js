import { useMutation, useQuery} from "@tanstack/react-query";
import equipmentService from "../services/EquipmentService";

export const useAddEquipment = (equipmentType) => {
   return useMutation({
      mutationFn: async (data ) => {
         const response = await equipmentService.addEquipment(data, equipmentType);
         return response
      }
   })
}

export const useGetAllEquipment = (page, limit, equipmentType,searchTerm ) => {
   return useQuery({
      queryKey: ["AllEquipment", page, limit, equipmentType,searchTerm ],
      queryFn: async () => {
         const response = await equipmentService.getAllEquipment(page, limit, equipmentType, searchTerm);
         return response?.data?.data || []  
      },
      enabled: !!page && !!limit && !!equipmentType,
   })
}

export const useGetSingleEquipment = (id) => {
   return useQuery({
      queryKey: ["SingleEquipment",id],
      queryFn: async () => {
         const response = await equipmentService.getSingleEquipment(id);
         return response?.data?.data || []
      },
      enabled: !!id
   })
}

export const useUpdateEquipment = (equipmentType) => {
   return useMutation({
      mutationFn: ({id,data}) => equipmentService.updateEquipment(id,data, equipmentType)
   })
}

export const useDeleteEquipment = () => {
   return useMutation({
      mutationFn:equipmentService.deleteEquipment
   })
}