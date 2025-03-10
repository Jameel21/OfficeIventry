import API from "@/helper/AxiosConfig";

const getAllocationlogs = async ({
  page=1,
  limit=10,
  keyword,
  searchTerm,
}) => {
  const response = await API.get(`/log/allocationHistory`, {
    params: { page, limit, keyword, searchTerm },
  });
  return response;
};

const getRequestLogs = async ({ page = 1, limit = 10 }) => {
  const response = await API.get(
    `/requestLog/getAllLogs?page=${page}&limit=${limit}`
  );
  return response;
};

const getRequestById = async (id) => {
  const response = await API.get(`/requestLog/getLog/${id}`);
  return response;
};

export default { getAllocationlogs, getRequestLogs, getRequestById };
