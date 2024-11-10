import API from "@/configs/AxiosConfig";

const userRegister = async (data) => {
const response = await API.post("/auth/register", data)
return response
}

const userLogin = async (data) => {
  const response = await API.post("/auth/login", data)
  return response
  }

  export default {
    userLogin,
    userRegister,
  };