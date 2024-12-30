import {useQuery } from "@tanstack/react-query";
import logService from "../services/LogService";

export const useGetAllocationLog = ({ page = 1, limit = 10 }) => {
  return useQuery({
    queryKey: ["allocationLog",page, limit],
    queryFn: async () => {
      const response = await logService.getAllocationlogs({ page, limit });
      return response?.data?.data || []
    }
  })
}

export const useGetAllRequestLogs = ({ page = 1, limit = 10 }) => {
  return useQuery({
    queryKey: ["requestLogs",page, limit],
    queryFn: async () => {
      const response = await logService.getRequestLogs({ page, limit });
      return response?.data?.data || []
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