import {useQuery } from "@tanstack/react-query";
import logService from "../services/LogService";

export const useGetEmployeeLog = () => {
  return useQuery({
    queryKey: ["employeeLog"],
    queryFn: async () => {
      const response = await logService.getEmployeelogs();
      return response?.data?.data || []
    }
  })
}