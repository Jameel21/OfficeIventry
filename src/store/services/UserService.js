import API from "@/helper/AxiosConfig";

const adduser = async (data) => {
  const response = await API.post("/user/adduser", data)
  return response
  }

const getAllUser = async ({ page = 1, limit = 10, searchTerm = "" }) => {
  const response = await API.get(`/user/getAllUsers?page=${page}&limit=${limit}&searchTerm=${searchTerm}`)
  return response
}

const getSingleUser = async (id) => {
  const response = await API.get(`user/getUser/${id}`)
  return response
}

const getUsersName = async () => {
  const response = await API.get(`user/getUserNames`)
  return response
}

const updateUser = async (id, data) => {
  const response = await API.patch(`/user/updateUser/${id}`, data);
  return response;
};

const deleteUser = async (id) =>{
  const response = await API.delete(`/user/deleteUser/${id}`);
  return response
}

export default {getAllUser,adduser,getSingleUser, updateUser, deleteUser, getUsersName}