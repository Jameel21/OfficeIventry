import { useMutation, useQuery} from "@tanstack/react-query";
import employeeService from "../services/EmployeeService";

export const useAddRequest = () => {
  return useMutation({
    mutationFn: employeeService.addRequest,
  });
};

export const useGetMyRequest = () => {
  return useQuery({
    queryKey: ["equipmentRequest"],
    queryFn: async () => {
      const response = await employeeService.getMyRequest();
      return response?.data?.data || [];
    },
  });
};

export const useGetAllRequests = (status) => {
  return useQuery({
    queryKey: ["pendingRequests", status],
    queryFn: async () => {
      const response = await employeeService.getAllRequests(status);
      return response?.data?.data?.equipmentRequests || []
    },
    enabled: !!status,
  })
}

export const useGetRequestById = (id) => {
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
    mutationFn: employeeService.updateReturn, 
  });
};

export const useUpdatePendingRequest = () => {
  return useMutation({
    mutationFn:employeeService.updatePendingRequest,
  });
};

export const useCancelPendingRequest = () => {
  return useMutation({
    mutationFn:(id) => employeeService.cancelPendingRequest(id),
  });
};