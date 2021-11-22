import axiosMy from './axiosClient';

const userApi = {
  loginWithEmail: async (requestOption: any) => {
    const url = `account/login`;
    return await axiosMy.post(url, requestOption);
  },
  registerWithEmail: async (requestOption: any) => {
    const url = `account/register`;
    return await axiosMy.post(url, requestOption);
  },
  getInfo: async (params: any) => {
    const url = `account/get-info`;
    return await axiosMy.get(url, { params });
  },
};

export default userApi;
