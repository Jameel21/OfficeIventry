import API from "@/helper/AxiosConfig";

const userLogin = async (data) => {
  const response = await API.post("/auth/login", data);
  return response;
};

const resetPassword = async (data) => {
  const response = await API.post("/auth/resetPassword", data);
  return response;
};

const forgotPassword = async (data) => {
  const response = await API.post("/auth/emailVerification", data);
  return response;
};

export default {
  userLogin,resetPassword, forgotPassword
};
