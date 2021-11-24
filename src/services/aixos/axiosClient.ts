import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

const baseURL = process.env.URL_MY_API || "https://hkclassroom.herokuapp.com/api/";
const buildysURL = process.env.REACT_APP_LINK_BUILDYS;

const axiosClient = axios.create({
  baseURL: baseURL,
  headers: {
    'content-type': 'application/json',
    Authorization: '',
  },
});
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  },
);
export default axiosClient;
