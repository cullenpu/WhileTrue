import createAxiosInstance from './axios';

const getContent = async () => {
  const instance = createAxiosInstance();
  const res = await instance.get('/content');

  return res.data;
};

const postContent = async (contentTitle: string, contentText: string) => {
  const instance = createAxiosInstance();
  const res = await instance.post('/content', { contentTitle, contentText });
  
  return res.status;
};

export { getContent, postContent };
