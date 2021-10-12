import axios from "axios"

const createAxiosInstance = (didToken: string) => {
    return axios.create({
        'baseURL': '/api',
        headers: {'Authorization': 'Bearer '+didToken}
    });
}

export default createAxiosInstance;