import { useMutation,useQuery} from "@tanstack/react-query";
import notificationService from "../services/NotificationService"

export const useGetAllNotifications = ({ page, limit }) => {
  return useQuery({
    queryKey: ["allNotifications",page, limit],
    queryFn: async () => {
      const response = await notificationService.getAllNotification({ page, limit });
      return response?.data?.data || []
    }
  })
}

export const useUpdateNotification = () => {
  return useMutation({
    mutationFn: (id) => notificationService.updateNotification(id)
  })
}

export const useDeleteNotifications = () => {
  return useMutation({
    mutationFn: notificationService.deleteNotifications
  })
}

export const useResetNotification = () => {
  return useMutation({
    mutationFn: notificationService.resetNotificationCount
  })
}

export const useGetNotificationCount = () => {
  return useQuery({
    queryKey: ["notificationCount"],
    queryFn: async () => {
      const response = await notificationService.getNotificationCount();
      return response?.data?.data || []
    }
  })
}
