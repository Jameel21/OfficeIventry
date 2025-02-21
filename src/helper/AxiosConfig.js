import { getDecodedData } from "@/utils/encryptDecrypt";
import axios from "axios";

const API = axios.create({
  baseURL:import.meta.env.VITE_BASE_URL
  
});

API.interceptors.request.use(
  (config) => {
    const userData = getDecodedData("userData"); 
    const token = userData?.authToken
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
 (response)=>{
  return response
 },
 (error) => {
  if(error.response && error.response.data){
    const message = error.response.data.message;
    console.log(message);
    if(message && message.includes("Token Expired")) {
      localStorage.removeItem("userData"); 
      console.error("Session expired, you have to login!")
      window.location.href = "/auth/login"
    }
  }
    return Promise.reject(error);
  }
);

export default API;
