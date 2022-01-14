import axiosClient from './axiosClient';

const userApi = {
  loginWithEmail: async (requestOption: any) => {
    const url = `account/login`;
    return await axiosClient.post(url, requestOption);
  },
  loginWithGoogle: async (requestOption: any) => {
    const url = `account/login-google`;
    return await axiosClient.post(url, requestOption);
  },
  registerWithEmail: async (requestOption: any) => {
    const url = `account/register`;
    return await axiosClient.post(url, requestOption);
  },
  forgotPassword: async (requestOption: any) => {
    const url = `account/forgot-password`;
    return await axiosClient.post(url, requestOption);
  },
  updateAccount: async (requestOption: any) => {
    const url = `account/update-account`;
    return await axiosClient.patch(url, requestOption);
  },
  updatePass: async (requestOption: any) => {
    const url = `account/update-account-pass`;
    return await axiosClient.patch(url, requestOption);
  },
  updateMSSV: async (requestOption: any) => {
    const url = `account/update-account-mssv`;
    return await axiosClient.patch(url, requestOption);
  },
  getInfo: async (params: any) => {
    const url = `account/get-info`;
    return await axiosClient.get(url, { params });
  },
  getListAdminAccounts: async () => {
    const url = `account/get-list-admin-accounts`;
    return await axiosClient.get(url);
  },
  getListUserAccounts: async () => {
    const url = `account/get-list-user-accounts`;
    return await axiosClient.get(url);
  },
  adminLogin: async (requestOption: any) => {
    const url = `account/admin-login`;
    return await axiosClient.post(url, requestOption);
  },
  adminRegister: async (requestOption: any) => {
    const url = `account/admin-register`;
    return await axiosClient.post(url, requestOption);
  },
};

export default userApi;
