import axiosInstance from '../utils/axiosconfig';

const userLogin = (data) => {
  return axiosInstance.post('/auth/login', data);
};

const userRegister = (data, token) => {
  return axiosInstance.post('/auth/register', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default {
  userLogin,
  userRegister
}