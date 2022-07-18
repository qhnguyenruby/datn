import {
  GET_WORKING_HOUR_BY_DATE_SUCCESS,
  GET_WORKING_HOUR_BY_DATE_ERROR,
  GET_TIME_ENTRIES_BY_DATE_SUCCESS,
  GET_TIME_ENTRIES_BY_DATE_ERROR,
  ADD_TIME_ENTRY_SUCCESS,
  ADD_TIME_ENTRY_ERROR,
  GET_USER_TIME_ENTRY_SUCCESS,
  GET_USER_TIME_ENTRY_ERROR,
  DELETE_TIME_ENTRY_SUCCESS,
  DELETE_TIME_ENTRY_ERROR,
} from "../../constants/common";
const initialState = {
  isSuccess: true,
  message: "",
  workingHours: [],
  timeEntries: [],
  newDataWorkingDone: {},
  userTimeEntry: [],
};

export const timeEntryReducer = (state = initialState, payload) => {
  switch (payload.type) {
    case GET_WORKING_HOUR_BY_DATE_SUCCESS:
      return { ...state, workingHours: payload.data, isSuccess: true };
    case GET_WORKING_HOUR_BY_DATE_ERROR:
      return { ...state, message: "Get Working Hours Fail!" };
    case GET_TIME_ENTRIES_BY_DATE_SUCCESS:
      return { ...state, timeEntries: payload.data, isSuccess: true };
    case GET_TIME_ENTRIES_BY_DATE_ERROR:
      return { ...state, message: "Get Time Entries Fail!" };
    case GET_USER_TIME_ENTRY_SUCCESS:
      return { ...state, userTimeEntry: payload.data, isSuccess: true };
    case GET_USER_TIME_ENTRY_ERROR:
      return { ...state, message: "Get User Time Entry Fail!" };
    case ADD_TIME_ENTRY_SUCCESS:
      return { ...state, newDataWorkingDone: payload.data, isSuccess: true };
    case ADD_TIME_ENTRY_ERROR:
      return { ...state, message: "Add Time Entry Fail!" };
    case DELETE_TIME_ENTRY_SUCCESS:
      return { ...state, isSuccess: true };
    case DELETE_TIME_ENTRY_ERROR:
      return { ...state, message: "Delete Time Entry Fail!" };
    default:
      return state;
  }
};
