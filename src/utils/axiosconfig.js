import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:7777/api',
});

export default axiosInstance;
