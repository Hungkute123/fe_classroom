import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import classStructureApi from '../../../services/aixos/classStructureApi';

export const getClassStructure = createAsyncThunk('class-structure/get', async (params: any) => {
  return await classStructureApi.getClassStructure(params).then((res) => res.data);
});
export const saveClassStructure = createAsyncThunk('class-structure/save', async (params: any) => {
  return await classStructureApi.saveClassStructure(params).then((res) => res.data);
});
export const patchClassStructure = createAsyncThunk(
  'class-structure/update',
  async (params: any) => {
    return await classStructureApi.patchClassStructure(params).then((res) => res.data);
  },
);
export const deleteClassStructure = createAsyncThunk(
  'class-structure/remove',
  async (params: any) => {
    return await classStructureApi.deleteClassStructure(params).then((res) => res.data);
  },
);

interface IInitialState {
  listGrade: any;
  status: boolean;
}
const initialClassStructure = {
  listGrade: [],
  status: false,
} as IInitialState;

export const classStructureSlide = createSlice({
  name: 'classStructure',
  initialState: initialClassStructure,

  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getClassStructure.fulfilled, (state, action) => {
      state.listGrade = action.payload;
    });
    builder.addCase(getClassStructure.rejected, (state, action) => {
      state.listGrade = [];
    });
    builder.addCase(saveClassStructure.fulfilled, (state, action) => {
      state.status = action.payload || false;
    });
    builder.addCase(patchClassStructure.fulfilled, (state, action) => {
      state.status = action.payload || false;
    });
    builder.addCase(deleteClassStructure.fulfilled, (state, action) => {
      state.status = action.payload || false;
    });
  },
});

const { reducer, actions } = classStructureSlide;
export const {} = actions;
export default reducer;
