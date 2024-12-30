import { useMutation, useQuery} from "@tanstack/react-query";
import masterService from "../services/MasterService"

//brand
export const useAddBrand = () => {
  return useMutation({
    mutationFn:masterService.addBrand
  })
}
export const useGetAllBrand = ({ page = 1, limit = 10 }) => {
  return useQuery({
    queryKey: ["AllBrand",page, limit],
    queryFn: async () => {
      const response = await masterService.getAllBrand({page, limit})
      return response?.data?.data || []
    }
  })
}
export const useGetBrand = (id) => {
  return useQuery({
    queryKey: ["Brand"],
    queryFn: async () => {
      const response = await masterService.getBrandById(id)
      return response?.data?.data || []
    }
  })
}
export const useUpdateBrand = () => {
  return useMutation({
    mutationFn: ({id, data}) => masterService.updateBrand(id,data)
  })
}
export const useDeleteBrand= () => {
  return useMutation({
    mutationFn: masterService.deleteBrand
  })
}

//department
export const useAddDepartment = () => {
  return useMutation({
    mutationFn:masterService.addDepartment
  })
}
export const useGetAllDepartment = ({ page = 1, limit = 10 }) => {
  return useQuery({
    queryKey: ["AllDepartment",page, limit],
    queryFn: async () => {
      const response = await masterService.getAllDepartment({page, limit})
      return response?.data?.data || []
    }
  })
}
export const useGetDepartment = (id) => {
  return useQuery({
    queryKey: ["Department"],
    queryFn: async () => {
      const response = await masterService.getDepartmentById(id)
      return response?.data?.data || []
    }
  })
}
export const useUpdateDepartment = () => {
  return useMutation({
    mutationFn: ({id, data}) => masterService.updateDepartment(id,data)
  })
}
export const useDeleteDepartment = () => {
  return useMutation({
    mutationFn: masterService.deleteDepartment
  })
}

//category
export const useAddCategory = (equipmentType) => {
  return useMutation({
    mutationFn:((data) => masterService.addCategory(data, equipmentType))
  })
}
export const useGetAllCategory = (page, limit,equipmentType) => {
  return useQuery({
    queryKey: ["AllCategory", page, limit, equipmentType],
    queryFn: async () => {
      const response = await masterService.getAllCategory(page, limit,equipmentType)
      return response?.data?.data || []
    },
    enabled: !!page && !!limit && !!equipmentType,
  })
}
export const useGetCategory = (id) => {
  return useQuery({
    queryKey: ["Category"],
    queryFn: async () => {
      const response = await masterService.getCategoryById(id)
      return response?.data?.data || []
    }
  })
}
export const useUpdateCategory = () => {
  return useMutation({
    mutationFn: ({id, data}) => masterService.updateCategory(id,data)
  })
}
export const useDeleteCategory = () => {
  return useMutation({
    mutationFn: masterService.deleteCategory
  })
}


//role
export const useAddRole = () => {
  return useMutation({
    mutationFn:masterService.addRole
  })
}
export const useGetAllRole = ({ page = 1, limit = 10 }) => {
  return useQuery({
    queryKey: ["AllRole",page, limit],
    queryFn: async () => {
      const response = await masterService.getAllRole({page, limit})
      return response?.data?.data || []
    }
  })
}
export const useGetRole = (id) => {
  return useQuery({
    queryKey: ["Role"],
    queryFn: async () => {
      const response = await masterService.getRoleById(id)
      return response?.data?.data || []
    }
  })
}
export const useUpdateRole = () => {
  return useMutation({
    mutationFn: ({id, data}) => masterService.updateRole(id,data)
  })
}
export const useDeleteRole = () => {
  return useMutation({
    mutationFn: masterService.deleteRole
  })
}

//menu
export const useGetAllMenu = () => {
  return useQuery({
    queryKey: ["AllMenu"],
    queryFn: async () => {
      const response = await masterService.getAllMenu()
      return response?.data?.data || []
    }
  })
}