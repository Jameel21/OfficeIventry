import API from "@/configs/AxiosConfig";

const adduser = async (data) => {
  const response = await API.post("/user/adduser", data)
  return response
  }

const getAllUser = async ({ page = 1, limit = 10 }) => {
  const response = await API.get(`/user/get-users?page=${page}&limit=${limit}`)
  return response
}

const getSingleUser = async (id) => {
  const response = await API.get(`user/get-user/${id}`)
  return response
}

const updateUser = async (id, data) => {
  const response = await API.put(`/user/update-user/${id}`, data);
  return response;
};

const deleteUser = async (id) =>{
  const response = await API.delete(`/user/delete-user/${id}`);
  return response
}

export default {getAllUser,adduser,getSingleUser, updateUser, deleteUser}