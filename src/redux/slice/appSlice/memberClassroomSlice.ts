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
interface IInitialState {
  teacher: any;
  student: any;
  status: string;
}
const initialMemberClassroom = {
  teacher: [],
  student: [],
  status: '',
} as IInitialState;

export const memberClassroomSlice = createSlice({
  name: 'memberClassroom',
  initialState: initialMemberClassroom,

  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTeacherByCodeClass.pending, (state, action) => {
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
      state.status = 'loading';
    });
    builder.addCase(getStudentByCodeClass.fulfilled, (state, action) => {
      state.status = 'success';
      state.student = action.payload;
    });
    builder.addCase(getStudentByCodeClass.rejected, (state, action) => {
      state.status = 'failed';
    });
  },
});

const { reducer, actions } = memberClassroomSlice;
export const { } = actions;
export default reducer;
