import API from "@/helper/AxiosConfig";

const userLogin = async (data) => {
  const response = await API.post("/auth/login", data)
  return response
  }

  export default {
    userLogin,
  };