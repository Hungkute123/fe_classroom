import axiosMy from './axiosClient';

const userApi = {
  loginWithEmail: async (requestOption: any) => {
    const url = `account/login`;
    return await axiosMy.post(url, requestOption);
  },
  loginWithGoogle: async (requestOption: any) => {
    const url = `account/login-google`;
    return await axiosMy.post(url, requestOption);
  },
  registerWithEmail: async (requestOption: any) => {
    const url = `account/register`;
    return await axiosMy.post(url, requestOption);
  },
  updateAccount: async (requestOption: any) => {
    const url = `account/update-account`;
    return await axiosMy.patch(url, requestOption);
  },
  updatePass: async (requestOption: any) => {
    const url = `account/update-account-pass`;
    return await axiosMy.patch(url, requestOption);
  },
  updateMSSV: async (requestOption: any) => {
    const url = `account/update-account-mssv`;
    return await axiosMy.patch(url, requestOption);
  },
  getInfo: async (params: any) => {
    const url = `account/get-info`;
    return await axiosMy.get(url, { params });
  },
};

export default userApi;
