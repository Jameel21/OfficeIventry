import { useMutation, useQuery} from "@tanstack/react-query";
import MasterService from "../services/MasterService"

//brand
export const useAddBrand = () => {
  return useMutation({
    mutationFn:MasterService.addBrand
  })
}
export const useGetAllBrand = () => {
  return useQuery({
    queryKey: ["AllBrand"],
    queryFn: async () => {
      const response = await MasterService.getAllBrand()
      return response?.data?.data || []
    }
  })
}
export const useGetBrand = (id) => {
  return useQuery({
    queryKey: ["Brand"],
    queryFn: async () => {
      const response = await MasterService.getBrandById(id)
      return response?.data?.data || []
    }
  })
}
export const useUpdateBrand = () => {
  return useMutation({
    mutationFn: ({id, data}) => MasterService.updateBrand(id,data)
  })
}
export const useDeleteBrand= () => {
  return useMutation({
    mutationFn: MasterService.deleteBrand
  })
}

//department
export const useAddDepartment = () => {
  return useMutation({
    mutationFn:MasterService.addDepartment
  })
}
export const useGetAllDepartment = () => {
  return useQuery({
    queryKey: ["AllDepartment"],
    queryFn: async () => {
      const response = await MasterService.getAllDepartment()
      return response?.data?.data || []
    }
  })
}
export const useGetDepartment = (id) => {
  return useQuery({
    queryKey: ["Department"],
    queryFn: async () => {
      const response = await MasterService.getDepartmentById(id)
      return response?.data?.data || []
    }
  })
}
export const useUpdateDepartment = () => {
  return useMutation({
    mutationFn: ({id, data}) => MasterService.updateDepartment(id,data)
  })
}
export const useDeleteDepartment = () => {
  return useMutation({
    mutationFn: MasterService.deleteDepartment
  })
}

//category
export const useAddCategory = () => {
  return useMutation({
    mutationFn:MasterService.addCategory
  })
}
export const useGetAllCategory = (equipmentType) => {
  return useQuery({
    queryKey: ["AllCategory", equipmentType],
    queryFn: async () => {
      const response = await MasterService.getAllCategory(equipmentType)
      return response?.data?.data || []
    }
  })
}


//role
export const useAddRole = () => {
  return useMutation({
    mutationFn:MasterService.addRole
  })
}
export const useGetAllRole = () => {
  return useQuery({
    queryKey: ["AllRole"],
    queryFn: async () => {
      const response = await MasterService.getAllRole()
      return response?.data?.data || []
    }
  })
}
export const useGetRole = (id) => {
  return useQuery({
    queryKey: ["Role"],
    queryFn: async () => {
      const response = await MasterService.getRoleById(id)
      return response?.data?.data || []
    }
  })
}
export const useUpdateRole = () => {
  return useMutation({
    mutationFn: ({id, data}) => MasterService.updateRole(id,data)
  })
}
export const useDeleteRole = () => {
  return useMutation({
    mutationFn: MasterService.deleteRole
  })
}

//menu
export const useGetAllMenu = () => {
  return useQuery({
    queryKey: ["AllMenu"],
    queryFn: async () => {
      const response = await MasterService.getAllMenu()
      return response?.data?.data || []
    }
  })
}