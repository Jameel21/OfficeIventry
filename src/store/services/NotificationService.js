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
export default {getAllNotification, updateNotification, deleteNotifications}