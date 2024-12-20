import API from "@/helper/AxiosConfig";

const getDashboardData = async() =>{
  const response = await API.get('/dashboard/allTotal')
  return response;
}

export default {
  getDashboardData,
};
