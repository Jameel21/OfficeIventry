import API from "@/helper/AxiosConfig";

const getAllNotification = async ({page, limit}) => {
  const response = await API.get(`/notification/getNotify?page=${page}&limit=${limit}`)
  return response
}

const updateNotification = async (id) => {
  const response = await API.put(`/notification/getById/${id}`);
  return response
}

const deleteNotifications = async () => {
  const response = await API.delete('/notification/delete');
  return response
}

const getNotificationCount = async () => {
  const response = await API.get(`/notification/unRead`)
  return response
}

const resetNotificationCount = async () => {
  const response = await API.put(`/notification/cleared`);
  return response
}
export default {getAllNotification, updateNotification, deleteNotifications, getNotificationCount,resetNotificationCount}