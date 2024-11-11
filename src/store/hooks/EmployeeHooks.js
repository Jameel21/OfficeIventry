import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import employeeService from "../services/EmployeeService";

export const useAddRequest = () => {
  return useMutation({
    mutationFn: employeeService.addRequest,
  });
};

export const useGetRequest = ({ username }) => {
  return useQuery({
    queryKey: ["equipmentRequest", username],
    queryFn: async () => {
      const response = await employeeService.getRequest(username);
      return response?.data?.data || [];
    },
  });
};

export const useUpdateRequest = ({ username }) => {
  const refetch = useQueryClient();
  return useMutation({
    mutationFn: employeeService.updateRequest,
    onSuccess: () => {
      refetch.refetchQueries({ queryKey: ["equipmentRequest", username] });
    },
    onError: (error) => {
      console.log(error);
      
    },
  });
};
