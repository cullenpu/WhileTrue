import axios from "axios";
import createAxiosInstance from "./axios";

axios.defaults.withCredentials = true;

interface UserInfoResponse {
    issuer: string;
    email: string;
}

const getUserInfo = async () => {
    try {
        const instance = createAxiosInstance();
        const res = await instance.get('/info');
        const userInfo: UserInfoResponse = res.data;
    
        return userInfo;
    } catch (err) {
        return {issuer: '', email: '', publicAddress: ''};
    }
}

export {getUserInfo};
