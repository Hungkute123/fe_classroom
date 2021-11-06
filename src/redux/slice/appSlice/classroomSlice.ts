import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import classroomApi from '../../../services/aixos/classroomApi';

export const getClassroomByIDUser = createAsyncThunk(
  'classroom/GetClassroomByIDUser',
  async (dispatch, getState) => {
    return await classroomApi.getClassByIDUser().then((res) => res);
  },
);
export const createClassroom = createAsyncThunk(
  'classroom/createClassroom',
  async (body : any) => {
    const requestOption = {
      body: JSON.stringify(body)
    }
    return await classroomApi.createClass(body).then((res) => res);
  },
);
interface IInitialState {
  classroom : any,
  status : string
}
const initialclassroom =  {
  classroom: [],
  status: "",
} as IInitialState

export const classroomSlice = createSlice({
  name: 'classroom',
  initialState: initialclassroom,

  reducers: {
    loadClassroom: (state, action) => {
      state.classroom.push(action.payload);
    },
    addClassroom: (state, action) => {
      // createClassroom(action.payload);
      state.classroom.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getClassroomByIDUser.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(getClassroomByIDUser.fulfilled, (state, action) => {
      state.status = 'success';
      state.classroom = action.payload;
    });
    builder.addCase(getClassroomByIDUser.rejected, (state, action) => {
      state.status = 'failed';
    });
    builder.addCase(createClassroom.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(createClassroom.fulfilled, (state, action) => {
      state.status = 'success';
    });
    builder.addCase(createClassroom.rejected, (state, action) => {
      state.status = 'failed';
    });
  },
});

const { reducer, actions } = classroomSlice;
export const { loadClassroom, addClassroom } = actions;
export default reducer;
