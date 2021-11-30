import createAxiosInstance from './axios';

const getData = async (route: string) => {
  const instance = createAxiosInstance();
  const res = await instance.get(`/data/${route}`);

  return res.data;
};

const postData = async (route: string, data: object) => {
  const instance = createAxiosInstance();
  const res = await instance.post(`/data/${route}`, data);

  return res.data;
};

export { getData, postData };
