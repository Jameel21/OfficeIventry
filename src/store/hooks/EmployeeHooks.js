import { useMutation, useQuery } from "@tanstack/react-query";
import employeeService from "../services/EmployeeService";

export const useAddRequest = () => {
  return useMutation({
    mutationFn: employeeService.addRequest,
  });
};

export const useGetMyRequest = ({ page = 1, limit = 10 }) => {
  return useQuery({
    queryKey: ["equipmentRequest", page, limit],
    queryFn: async () => {
      const response = await employeeService.getMyRequest({ page, limit });
      return response?.data?.data || [];
    },
  });
};

export const useGetUserRequest = ({ id,page = 1, limit = 10 }) => {
  return useQuery({
    queryKey: ["userRequest",id, page, limit],
    queryFn: async () => {
      const response = await employeeService.getUserRequest({id, page, limit });
      return response?.data?.data || [];
    },
  });
};

export const useGetAllRequests = (page, limit, status) => {
  return useQuery({
    queryKey: ["pendingRequests", page, limit, status],
    queryFn: async () => {
      const response = await employeeService.getAllRequests(
        page,
        limit,
        status
      );
      return response?.data?.data || [];
    },
    enabled: !!page && !!limit && !!status,
  });
};

export const useGetRequestById = (id) => {
  return useQuery({
    queryKey: ["pendingRequestById", id],
    queryFn: async () => {
      const response = await employeeService.getRequestById(id);
      return response?.data?.data || [];
    },
    enabled: !!id,
  });
};

export const useUpdateRequestFields = () => {
  return useMutation({
    mutationFn: employeeService.updateReturn,
  });
};

export const useUpdatePendingRequest = () => {
  return useMutation({
    mutationFn: employeeService.updatePendingRequest,
  });
};

export const useCancelPendingRequest = () => {
  return useMutation({
    mutationFn: (id) => employeeService.cancelPendingRequest(id),
  });
};
