import { combineReducers } from "@reduxjs/toolkit";

import classroomSlice from '../slice/appSlice/classroomSlice';
import createClassModalSlice from "../slice/appSlice/createClassModalSlice";
import memberClassroomSlice from "../slice/appSlice/memberClassroomSlice";

export const rootReducer = combineReducers({
  classroom: classroomSlice,
  memberClassroom: memberClassroomSlice,
  createClassModal: createClassModalSlice
});
export type RootState = ReturnType<typeof rootReducer>;
