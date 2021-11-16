import axios from 'axios';

const createAxiosInstance = (didToken = '') => {
  if (didToken === '') {
    return axios.create({
      baseURL: '/api',
      withCredentials: true,
    });
  }
  return axios.create({
    baseURL: '/api',
    headers: { Authorization: `Bearer ${didToken}` },
    withCredentials: true,
  });
};

export default createAxiosInstance;
