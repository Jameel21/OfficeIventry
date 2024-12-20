import API from "@/helper/AxiosConfig";

const getAllNotification = async () => {
  const response = await API.get(`/notification/getNotify`)
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
export default {getAllNotification, updateNotification, deleteNotifications}