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

export const useGetAllEquipment = (page, limit, equipmentType) => {
   return useQuery({
      queryKey: ["ListAllEquipment", page, limit, equipmentType],
      queryFn: async () => {
         const response = await equipmentService.getAllEquipment(page, limit, equipmentType);
         return response?.data?.data?.equipment || []
      },
      enabled: !!page && !!limit && !!equipmentType,
   })
}

export const useGetSingleEquipment = (id) => {
   return useQuery({
      queryKey: ["LisSingleEquipment",id],
      queryFn: async () => {
         const response = await equipmentService.getSingleEquipment(id);
         return response?.data?.data || []
      },
      enabled: !!id
   })
}