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

export const accountSlice = createSlice({
  name: 'account',
  initialState: {
    isAccount: '',
    account: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginWithEmail.fulfilled, (state, action) => {
      localStorage.setItem('jwt', action.payload);
    });
    builder.addCase(loginWithGoogle.fulfilled, (state, action) => {
      localStorage.setItem('jwt', action.payload);
    });
    builder.addCase(registerWithEmail.fulfilled, (state, action) => {
      console.log('Register: ', action);
    });
    builder.addCase(getInfo.fulfilled, (state, action) => {
      state.account = action.payload;
      if (typeof state.account != 'undefined') {
        state.isAccount = 'true';
      } else {
        state.isAccount = 'false';
      }
    });
    builder.addCase(updateAccount.fulfilled, (state, action) => {
      console.log('Update Account: ', action);
    });
    builder.addCase(updatePass.fulfilled, (state, action) => {
      console.log('Update Pass: ', action);
    });
    builder.addCase(updateMSSV.fulfilled, (state, action) => {
      console.log('Update MSSV: ', action);
    });
  },
});

const { reducer, actions } = accountSlice;
export const {} = actions;
export default reducer;
