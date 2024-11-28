import API from "@/configs/AxiosConfig";

const addRequest = async (data) => {
  const response = await API.post("/equipment/requestEquipment", data);
  return response;
};
const getRequest = async () => {
  const response = await API.get("/equipment/employeeRequest");
  return response;
};

const getPendingRequests = async (status) => {
  const response = await API.get("/equipment/pendingRequest", {
    params: { status },
  });
  return response;
};

export const getRequestById = async (id) => {
  const response = await API.get(`/equipment/pendingRequest/${id}`);
  return response;
};

const updateRequest = async ({ id, ...fields }) => {
  const response = await API.patch(
    `/equipment/updatingReqFields/${id}`,
    fields
  );
  return response;
};

const updatePendingRequest = async ({ id, data }) => {
  const response = await API.put(`/equipment/updateRequest/${id}`, data);
  return response;
};

export default {
  addRequest,
  getRequest,
  updateRequest,
  getRequestById,
  getPendingRequests,
  updatePendingRequest,
};
