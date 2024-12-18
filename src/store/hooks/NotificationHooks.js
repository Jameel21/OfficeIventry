import { useMutation,useQuery} from "@tanstack/react-query";
import notificationService from "../services/NotificationService"

export const useGetAllNotifications = () => {
  return useQuery({
    queryKey: ["allNotifications"],
    queryFn: async () => {
      const response = await notificationService.getAllNotification();
      return response?.data?.data || []
    }
  })
}

export const useGetNotification = (id) => {
  return useQuery({
    queryKey: ["notification", id],
    queryFn: async () => {
      const response = await notificationService.getNotification(id);
      return response?.data?.data || []
    },
      enabled: !!id, // Prevent the query from running until `notificationId` is set
  })
}

export const useDeleteNotifications = () => {
  return useMutation({
    mutationFn: notificationService.deleteNotifications
  })
}