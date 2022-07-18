import { combineReducers } from "redux";
import { projectReducer } from "./projectReducer";
import { userReducer } from "./userReducer";
import { timeEntryReducer } from "./timeEntryReducer";
import { reportReducer } from "./reportReducer";
import varSlice from "../slices/varSlice";
import loadingSlice from "../slices/loadingSlice";
import workByDaySlice from "../slices/workByDaySlice";
import reportDateRangeSlice from "../slices/reportDateRangeSlice";
import { accountReducer } from "./accountReducer";
import reportPageSlice from "../slices/reportPageSlice";
import listProjectSlice from "../slices/listProjectSlice";
import projectSlice from "../slices/projectSlice";
import projectTrackTimeSlice from "../slices/projectTrackTimeSlice";
import workSlice from "../slices/workSlice";
import projectEditSlice from "../slices/projectEditSlice";
import memberSlice from "../slices/memberSlice";

const reducers = combineReducers({
  projectR: projectReducer,
  user: userReducer,
  time_entry: timeEntryReducer,
  report: reportReducer,
  projects: projectTrackTimeSlice,
  works: workSlice,
  workByDay: workByDaySlice,
  vars: varSlice,
  loadings: loadingSlice,
  listprojects: listProjectSlice,
  members: memberSlice,
  // projectdetail: projectDetailSlice,
  reportDateRange: reportDateRangeSlice,
  reportPageData: reportPageSlice,
  project: projectSlice,
  projectEdit: projectEditSlice,
});

export default (state, action) => reducers(state, action);
