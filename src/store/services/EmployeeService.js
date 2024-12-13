import API from "@/helper/AxiosConfig";

const addRequest = async (data) => {
  const response = await API.post("/equipmentRequest/addRequest", data);
  return response;
};
const getRequest = async () => {
  const response = await API.get("/equipmentRequest/getEmployeeRequest");
  return response;
};

const getAllRequests = async (status) => {
  const response = await API.get("/equipmentRequest/getAllRequests", {
    params: { status },
  });
  return response;
};

export const getRequestById = async (id) => {
  const response = await API.get(`/equipmentRequest/getRequest/${id}`);
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

export default {
  addRequest,
  getRequest,
  updateReturn,
  getRequestById,
  getAllRequests,
  updatePendingRequest,
};
