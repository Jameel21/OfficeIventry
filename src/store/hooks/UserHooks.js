import { useMutation, useQuery} from "@tanstack/react-query";
import userService from "../services/UserService";


export const useAddUser = () => {
  return useMutation({
    mutationFn: userService.adduser,  
  });
};

export const useGetAllUsers = ({ page = 1, limit = 10, searchTerm = "" }) => {
  return useQuery({
    queryKey:["AllUsers",page, limit,searchTerm],
    queryFn: async () => {
     const response = await userService.getAllUser({ page, limit, searchTerm  })
     return response?.data?.data || []
    } 
  })
}

export const useGetSingleUser = (id) => {
  return useQuery({
    queryKey: ["SingleUser", id],
    queryFn: async () => {
      const response = await userService.getSingleUser(id);
      return response?.data?.data || null;
    },
    enabled: !!id, // get only if the particular id exists
  })
}

export const useGetUsersName = () => {
  return useQuery({
    queryKey: ["AllUsersName"],
    queryFn: async () => {
      const response = await userService.getUsersName();
      return response?.data?.data || null;
    },
  })
}

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: ({id,data}) => userService.updateUser(id,data)
  })
}

export const useDeleteUser = () => {
  return useMutation({
    mutationFn:userService.deleteUser
  })
}