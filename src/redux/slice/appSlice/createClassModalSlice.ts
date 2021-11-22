import { createSlice } from '@reduxjs/toolkit';

type IInitialState = {
  isOpen: boolean;
};

const initialState = {
  isOpen: false,
} as IInitialState;

export const createClassModalSlice = createSlice({
  name: 'createClassModal',
  initialState: initialState,
  reducers: {
    doOpenCreateClassModal(state) {
      state.isOpen = true;
    },
    doCloseCreateClassModal(state) {
      state.isOpen = false;
    },
  },
});

const { actions, reducer } = createClassModalSlice;
export const { doOpenCreateClassModal, doCloseCreateClassModal } = actions;
export default reducer;
