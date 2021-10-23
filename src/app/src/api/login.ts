import axios from "axios";
import createAxiosInstance from "./axios";

const postLogin = async (didToken: string) => {
  try {
    const instance = createAxiosInstance(didToken);

    const res = await instance.post('/login');

    return res.status;
  } catch (err) {
    throw err;
  }
};

export default postLogin;
