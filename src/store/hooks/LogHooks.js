import {useQuery } from "@tanstack/react-query";
import logService from "../services/LogService";

export const useGetAllocationLog = () => {
  return useQuery({
    queryKey: ["allocationLog"],
    queryFn: async () => {
      const response = await logService.getAllocationlogs();
      return response?.data?.data?.logs || []
    }
  })
}

export const useGetAllRequestLogs = () => {
  return useQuery({
    queryKey: ["requestLogs"],
    queryFn: async () => {
      const response = await logService.getRequestLogs();
      return response?.data?.data?.logs || []
    }
  })
}

export const useGetRequestLog = (id) => {
return useQuery({
  queryKey: ["requestLog", id],
  queryFn: async () => {
    const response = await logService.getRequestById(id);
    return response?.data?.data || []
  }
})
}