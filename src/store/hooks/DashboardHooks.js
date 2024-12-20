import {useQuery } from "@tanstack/react-query";
import dashboardService from "../services/DashboardService";

export const useGetDashboardData = () => {
  return useQuery({
     queryKey:["totalrequest"],
     queryFn: async () => {
        const response = await dashboardService.getDashboardData();
        return response?.data?.data || []
     }
  })
}