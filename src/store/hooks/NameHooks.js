import { useQuery } from "@tanstack/react-query";
import nameService from "../services/NameService";

export const useGetRoles = () => {
  return useQuery({
    queryKey: ["roles"],
    queryFn: async () => {
      const response = await nameService.getRolesName();
      return response?.data?.data
    }
  })
}

export const useGetDepartment = () => {
  return useQuery({
    queryKey: ["department"],
    queryFn: async () => {
      const response = await nameService.getDepartmentsName();
      return response?.data?.data
    }
  })
}

export const useGetEquipment = () => {
  return useQuery({
    queryKey: ["equipment"],
    queryFn:async () => {
      const response = await nameService.getEquipmentsName();
      return response?.data?.data
    }
  })
}

export const useGetBrand = (id) => {
  return useQuery({
    queryKey:["brand"],
    queryFn: async () => {
      const response = await nameService.getBrandNames(id)
      return response?.data?.data
    }
  })
}
