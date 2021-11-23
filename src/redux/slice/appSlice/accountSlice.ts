import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import accountApi from '../../../services/aixos/accountApi';

export const loginWithEmail = createAsyncThunk('account/login', async (params: any) => {
  return await accountApi.loginWithEmail(params).then((res) => res.data);
});

export const registerWithEmail = createAsyncThunk('account/register', async (params: any) => {
  return await accountApi.registerWithEmail(params).then((res) => res.data);
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
    builder.addCase(registerWithEmail.fulfilled, (state, action) => {
      console.log('Register: ', action);
    });
    builder.addCase(getInfo.fulfilled, (state, action) => {
      state.account = action.payload._doc;
      if (typeof state.account != 'undefined') {
        state.isAccount = 'true';
      } else {
        state.isAccount = 'false';
      }
    });
    builder.addCase(getInfo.rejected, (state, action) => {
      state.isAccount = 'false';
    });
  },
});

const { reducer, actions } = accountSlice;
export const {} = actions;
export default reducer;
