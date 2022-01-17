import axiosClient from './axiosClient';

const reviewMarkApi = {
  addMark: async (requestOption: any) => {
    const url = 'review-mark/add-review';
    return await axiosClient.post(url, requestOption);
  },
  getALLMark: async (params: any) => {
    const url = 'review-mark/get-all-review';
    const { data } = await axiosClient.get(url, { params });
    return data;
  },
  getMark: async (params: any) => {
    const url = 'review-mark/get-review';
    const { data } = await axiosClient.get(url, { params });
    return data;
  },
  updateMark: async (requestOption: any) => {
    const url = 'review-mark/update-review';
    return await axiosClient.patch(url, requestOption);
  },
};

export default reviewMarkApi;
