import API from "@/helper/AxiosConfig";

const addRequest = async (data) => {
  const response = await API.post("/equipmentRequest/addRequest", data);
  return response;
};
const getMyRequest = async ({page = 1, limit = 10}) => {
  const response = await API.get(`/equipmentRequest/getEmployeeRequest?page=${page}&limit=${limit}`);
  return response;
};

const getAllRequests = async (page,limit,status) => {
  const response = await API.get("/equipmentRequest/getAllRequests", {
    params: {page,limit, status },
  });
  return response;
};

export const getRequestById = async (id) => {
  const response = await API.get(`/equipmentRequest/getRequest/${id}`);
  return response;
};

export const getUserRequest = async ({ id, page = 1, limit = 10, status }) => {
  const response = await API.get(`/equipmentRequest/userDetails/${id}`, {
    params: { page, limit , status},
  });
  return response;
};

const updateReturn = async ({ id, ...fields }) => {
  const response = await API.put(
    `/equipmentRequest/updatingReturn/${id}`,
    fields
  );
  return response;
};

const updatePendingRequest = async ({ id, data }) => {
  const response = await API.put(`/equipmentRequest/updateRequest/${id}`, data);
  return response;
};

const cancelPendingRequest = async (id) => {
  const response = await API.patch(`/equipmentRequest/cancelRequest/${id}`);
  return response;
};

const deleteRequest = async (id) => {
  const response = await API.delete(`/equipmentRequest/delete/${id}`);
  return response;
};

export default {
  addRequest,
  getMyRequest,
  getUserRequest,
  updateReturn,
  getRequestById,
  getAllRequests,
  updatePendingRequest,
  cancelPendingRequest,
  deleteRequest
};
