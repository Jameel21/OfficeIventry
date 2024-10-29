import axiosBase from '../utils/axiosconfig';

const userLogin = (data) => {
  return axiosBase.post('/auth/login', data);
};

const userRegister = (data, token) => {
  return axiosBase.post('/auth/register', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default {
  userLogin,
  userRegister
}