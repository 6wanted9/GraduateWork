import axios from "axios";
import { apiBaseUrl } from "../constants/api";
import qs from "qs";
import { AuthSession } from "./AuthSession";
import { toast } from "react-toastify";

const headers = {
    'Accept-Language': 'en',
    'Content-Type': 'application/json'
};

const Api = axios.create({
    baseURL: apiBaseUrl,
    headers,
    paramsSerializer: (params) => qs.stringify(params)
});

Api.interceptors.request.use(
    async (config) => {
        return {
            ...config,
            url: config.url && encodeURI(config.url)
        };
    },
    (error) => {
        toast.error(error)
        return Promise.reject(error)
    }
);

Api.interceptors.response.use(
    (res) => res.data,
    (err) => {
        if (err.response) {
            switch (err.response.status) {
                case 401:
                    AuthSession.logout();
                    break;

                default:
                    break;
            }
        }

        toast.error(err.response?.message || err.message)

        return Promise.reject(err.message);
    }
);

export default Api;