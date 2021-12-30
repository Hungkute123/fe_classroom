import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import accountApi from '../../../services/aixos/accountApi';

export const loginWithEmail = createAsyncThunk('account/login', async (params: any) => {
  return await accountApi.loginWithEmail(params).then((res) => res.data);
});

export const loginWithGoogle = createAsyncThunk('account/login-google', async (params: any) => {
  return await accountApi.loginWithGoogle(params).then((res) => res.data);
});

export const registerWithEmail = createAsyncThunk('account/register', async (params: any) => {
  return await accountApi.registerWithEmail(params).then((res) => res.data);
});

export const updateAccount = createAsyncThunk('account/update-account', async (params: any) => {
  return await accountApi.updateAccount(params).then((res) => res.data);
});

export const updatePass = createAsyncThunk('account/update-account-pass', async (params: any) => {
  return await accountApi.updatePass(params).then((res) => res.data);
});

export const updateMSSV = createAsyncThunk('account/update-account-mssv', async (params: any) => {
  return await accountApi.updateMSSV(params).then((res) => res.data);
});

export const getInfo = createAsyncThunk('account/get-info', async (params: any) => {
  return await accountApi.getInfo(params).then((res) => res.data);
});
export const getListUserAccounts = createAsyncThunk('account/get-list-user-accounts', async () => {
  return await accountApi.getListUserAccounts().then((res) => res.data);
});
export const getListAdminAccounts = createAsyncThunk(
  'account/get-list-admin-accounts',
  async () => {
    return await accountApi.getListAdminAccounts().then((res) => res.data);
  },
);
export const adminLogin = createAsyncThunk('account/admin-login', async (params: any) => {
  return await accountApi.adminLogin(params).then((res) => res.data);
});
export const adminRegister = createAsyncThunk('account/admin-register', async (params: any) => {
  return await accountApi.adminRegister(params).then((res) => res.data);
});
export const accountSlice = createSlice({
  name: 'account',
  initialState: {
    isAccount: '',
    account: {},
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    // login with email
    builder.addCase(loginWithEmail.fulfilled, (state, action) => {
      localStorage.setItem('jwt', action.payload);
    });
    //login with google
    builder.addCase(loginWithGoogle.fulfilled, (state, action) => {
      localStorage.setItem('jwt', action.payload);
    });
    //login with email
    builder.addCase(registerWithEmail.fulfilled, (state, action) => {
      state.isLoading = true;
    });
    //get info user
    builder.addCase(getInfo.fulfilled, (state, action) => {
      state.account = action.payload;
      if (state.account) {
        state.isAccount = 'true';
      } else {
        state.isAccount = 'false';
      }
    });
    //update account
    builder.addCase(updateAccount.fulfilled, (state, action) => {
      state.isLoading = true;
    });
    //update pass
    builder.addCase(updatePass.fulfilled, (state, action) => {
      state.isLoading = true;
    });
    //update mssv
    builder.addCase(updateMSSV.fulfilled, (state, action) => {
      state.isLoading = true;
    });
    //update get list user accounts
    builder.addCase(getListUserAccounts.fulfilled, (state, action) => {
      state.isLoading = true;
    });
    //update get list admin acocunts
    builder.addCase(getListAdminAccounts.fulfilled, (state, action) => {
      state.isLoading = true;
    });
    //update admin login
    builder.addCase(adminLogin.fulfilled, (state, action) => {
      state.isLoading = true;
    });
    //update admin register
    builder.addCase(adminRegister.fulfilled, (state, action) => {
      state.isLoading = true;
    });
  },
});

const { reducer, actions } = accountSlice;
export const {} = actions;
export default reducer;
