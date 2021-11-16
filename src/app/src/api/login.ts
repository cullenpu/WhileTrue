import createAxiosInstance from './axios';

const postLogin = async (didToken: string, email: string) => {
  const instance = createAxiosInstance(didToken);

  const res = await instance.post('/login', { email });

  return res.status;
};

export default postLogin;
