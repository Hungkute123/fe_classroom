import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import memberClassroomApi from '../../../services/aixos/memberClassroomApi';

export const getTeacherByCodeClass = createAsyncThunk(
  'memberClassroom/getTeacherByCodeClass',
  async (params: any) => {
    return await memberClassroomApi.getTeacherByCodeClass(params).then((res) => res);
  },
);
export const getStudentByCodeClass = createAsyncThunk(
  'memberClassroom/getStudentByCodeClass',
  async (params: any) => {
    return await memberClassroomApi.getStudentByCodeClass(params).then((res) => res);
  },
);
export const joinClassroom = createAsyncThunk(
  'memberClassroom/joinClassroom',
  async (params: any) => {
    return await memberClassroomApi.joinClassroom(params).then((res) => res);
  },
);
export const getMyInfo = createAsyncThunk(
  'memberClassroom/getMyInfo',
  async (params: any) => {
    return await memberClassroomApi.getMyInfo(params).then((res) => res);
  },
);
interface IInitialState {
  teacher: any;
  student: any;
  myInfo: any;
  status: string;
}
const initialMemberClassroom = {
  teacher: [],
  student: [],
  myInfo: '',
  status: '',
} as IInitialState;

export const memberClassroomSlice = createSlice({
  name: 'memberClassroom',
  initialState: initialMemberClassroom,

  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTeacherByCodeClass.pending, (state, action) => {
      state.teacher = [];
      state.status = 'loading';
    });
    builder.addCase(getTeacherByCodeClass.fulfilled, (state, action) => {
      state.status = 'success';
      state.teacher = action.payload;
    });
    builder.addCase(getTeacherByCodeClass.rejected, (state, action) => {
      state.status = 'failed';
    });
    builder.addCase(getStudentByCodeClass.pending, (state, action) => {
      state.student = [];
      state.status = 'loading';
    });
    builder.addCase(getStudentByCodeClass.fulfilled, (state, action) => {
      state.status = 'success';
      state.student = action.payload;
    });
    builder.addCase(getStudentByCodeClass.rejected, (state, action) => {
      state.status = 'failed';
    });
    builder.addCase(joinClassroom.fulfilled, (state, action) => {
      state.status = 'success';
    });
    builder.addCase(getMyInfo.pending, (state, action) => {
      state.myInfo = '';
    });
    builder.addCase(getMyInfo.fulfilled, (state, action) => {
      state.status = 'success';
      state.myInfo = action.payload;
    });
  },
});

const { reducer, actions } = memberClassroomSlice;
export const { } = actions;
export default reducer;
