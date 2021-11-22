import { combineReducers } from "@reduxjs/toolkit";

import classroomSlice from '../slice/appSlice/classroomSlice';
import accountSlice  from "../slice/appSlice/accountSlice";

export const rootReducer = combineReducers({
  classroom: classroomSlice,
  account: accountSlice,
});
export type RootState = ReturnType<typeof rootReducer>;
