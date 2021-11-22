import { combineReducers } from "@reduxjs/toolkit";

import classroomSlice from '../slice/appSlice/classroomSlice';
import accountSlice  from "../slice/appSlice/accountSlice";
import createClassModalSlice from "../slice/appSlice/createClassModalSlice";
import memberClassroomSlice from "../slice/appSlice/memberClassroomSlice";

export const rootReducer = combineReducers({
  classroom: classroomSlice,
  memberClassroom: memberClassroomSlice,
  createClassModal: createClassModalSlice,
  account: accountSlice,

});
export type RootState = ReturnType<typeof rootReducer>;
