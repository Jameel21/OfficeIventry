import API from "@/helper/AxiosConfig";

const getAllocationlogs = async () => {
  const response = await API.get("/log/allocationHistory")
  return response
}

const getRequestLogs = async () => {
  const response = await API.get("/requestLog/getAllLogs")
  return response
}

const getRequestById = async (id) => {
  const response = await API.get(`/requestLog/getLog/${id}`);
  return response
}

export default {getAllocationlogs, getRequestLogs, getRequestById}