import { combineReducers } from "@reduxjs/toolkit";

import classroomSlice from '../slice/appSlice/classroomSlice';

export const rootReducer = combineReducers({
  classroom: classroomSlice,
});
export type RootState = ReturnType<typeof rootReducer>;
