import { getDecodedData } from "@/utils/encryptDecrypt";
import axios from "axios";

const API = axios.create({
  baseURL:import.meta.env.VITE_BASE_URL
  
});


API.interceptors.request.use(
  (config) => {
    const token = getDecodedData("authToken");
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
    return Promise.reject(error);
  }
);

export default API;
