import axios from '../utils/axiosConfig';

interface UserData {
  username: string;
  password: string;
}

export const register = (data: UserData) => {
  return axios.post('/auth/register', data);
};

export const login = (data: UserData) => {
  return axios.post('/auth/login', data);
};

export const logout = () => {
  return axios.post('/auth/logout');
};
