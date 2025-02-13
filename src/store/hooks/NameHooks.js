import { useQuery } from "@tanstack/react-query";
import nameService from "../services/NameService";

export const useGetEquipmentName = (equipmentType, includeAll = false) => {
  return useQuery({
    queryKey: ["equipmentName", equipmentType,includeAll ],
    queryFn:async () => {
      const response = await nameService.getEquipmentsName(equipmentType, includeAll);
      return response?.data?.data || []
    }
  })
}


export const useGetSerialNumbers = (equipmentId, brandId) => {
  return useQuery({
    queryKey: ["serialNumbers", equipmentId, brandId],
    queryFn: async () => {
      if (!equipmentId || !brandId) return []; 
      const response = await nameService.getSerialNumbers(equipmentId, brandId);
      return response?.data?.data; 
    },
    enabled: !!equipmentId && !!brandId, 
  });
};