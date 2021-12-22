import axiosClient from './axiosClient';

const markApi = {
  addListStudent: async (requestOption: any) => {
    const url = 'mark/add-list-student';
    return await axiosClient.post(url, requestOption);
  },
  addMark: async (requestOption: any) => {
    const url = 'mark/add-mark';
    return await axiosClient.post(url, requestOption);
  },
  getAllMark: async (params: any) => {
    const url = 'mark/get-all-mark';
    const { data } = await axiosClient.get(url, { params });
    return data;
  },
};

export default markApi;
