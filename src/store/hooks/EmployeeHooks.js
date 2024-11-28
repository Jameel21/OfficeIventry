import { useMutation, useQuery} from "@tanstack/react-query";
import employeeService from "../services/EmployeeService";

export const useAddRequest = () => {
  return useMutation({
    mutationFn: employeeService.addRequest,
  });
};

export const useGetRequest = () => {
  return useQuery({
    queryKey: ["equipmentRequest"],
    queryFn: async () => {
      const response = await employeeService.getRequest();
      return response?.data?.data || [];
    },
  });
};

export const useGetPendingRequests = (status) => {
  return useQuery({
    queryKey: ["pendingRequests", status],
    queryFn: async () => {
      const response = await employeeService.getPendingRequests(status);
      return response?.data?.data || []
    },
    enabled: !!status,
  })
}

export const useGetPendingRequestById = (id) => {
  return useQuery({
   queryKey: ["pendingRequestById", id],
   queryFn: async () => {
     const response = await employeeService.getRequestById(id);
     return response?.data?.data || []
   },
   enabled: !!id,
  })
 };

 export const useUpdateRequestFields = () => {
  return useMutation({
    mutationFn: employeeService.updateRequest,
    
  });
};

export const useUpdatePendingRequest = () => {
  return useMutation({
    mutationFn:employeeService.updatePendingRequest,
  });
};