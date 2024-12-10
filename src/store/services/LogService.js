import API from "@/helper/AxiosConfig";

const getEmployeelogs = async () => {
  const response = await API.get("/log/employeeHistory")
  return response
}

export default {getEmployeelogs}