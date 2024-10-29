import axios from 'axios';

const axiosBase = axios.create({
  baseURL: 'http://localhost:7777/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosBase;
