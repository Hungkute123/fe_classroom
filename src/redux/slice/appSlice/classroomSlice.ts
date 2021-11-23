import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import classroomApi from '../../../services/aixos/classroomApi';

export const getClassroomByIDUser = createAsyncThunk(
  'classroom/GetClassroomByIDUser',
  async (params: any) => {
    return await classroomApi.getClassByIDUser(params).then((res) => res);
  },
);
export const createClassroom = createAsyncThunk('classroom/createClassroom', async (body: any) => {
  const requestOption = {
    body: JSON.stringify(body),
  };
  return await classroomApi.createClass(body).then((res) => res.data);
});
export const getClassroomByCodeClass = createAsyncThunk(
  'classroom/GetClassroomByCodeClass',
  async (params: any) => {
    return await classroomApi.getClassByCodeClass(params).then((res) => res);
  },
);
export const inviteClassroom = createAsyncThunk(
  'classroom/inviteClassroom',
  async (params: any) => {
    return await classroomApi.inviteClassroom(params).then((res) => res);
  },
);
interface IInitialState {
  classroom: any;
  infoMyClassroom: any;
  status: string;
}
const initialclassroom = {
  classroom: [],
  infoMyClassroom: '',
  status: '',
} as IInitialState;

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
      const check = action.payload;
      if (check.length != 0) {
        state.classroom.push(action.payload);
      }
    });
    builder.addCase(createClassroom.rejected, (state, action) => {
      state.status = 'failed';
    });
    builder.addCase(getClassroomByCodeClass.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(getClassroomByCodeClass.fulfilled, (state, action) => {
      state.status = 'success';
      state.infoMyClassroom = action.payload;
    });
    builder.addCase(getClassroomByCodeClass.rejected, (state, action) => {
      state.status = 'failed';
    });
    builder.addCase(inviteClassroom.fulfilled, (state, action) => {
      state.status = 'success';
    });
  },
});

const { reducer, actions } = classroomSlice;
export const { loadClassroom, addClassroom } = actions;
export default reducer;
