import {useQuery } from "@tanstack/react-query";
import LogService from "../services/LogService";

export const useGetEmployeeLog = () => {
  return useQuery({
    queryKey: ["employeeLog"],
    queryFn: async () => {
      const response = await LogService.getEmployeelogs();
      return response?.data?.data || []
    }
  })
}