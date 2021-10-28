import axios from "axios";
import createAxiosInstance from "./axios";

const postLogin = async (didToken: string, email: string) => {
  try {
    const instance = createAxiosInstance(didToken);

    const res = await instance.post('/login', {email});

    return res.status;
  } catch (err) {
    throw err;
  }
};

export default postLogin;
