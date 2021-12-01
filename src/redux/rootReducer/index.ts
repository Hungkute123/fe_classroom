import { combineReducers } from "@reduxjs/toolkit";

import classroomSlice from '../slice/appSlice/classroomSlice';
import accountSlice  from "../slice/appSlice/accountSlice";
import createClassModalSlice from "../slice/appSlice/createClassModalSlice";
import memberClassroomSlice from "../slice/appSlice/memberClassroomSlice";
import classStructureSlide from "../slice/appSlice/classStructureSlide";

export const rootReducer = combineReducers({
  classroom: classroomSlice,
  memberClassroom: memberClassroomSlice,
  createClassModal: createClassModalSlice,
  account: accountSlice,
  classStructure: classStructureSlide,
});

export type RootState = ReturnType<typeof rootReducer>;
