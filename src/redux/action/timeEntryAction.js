import jwtDecode from "jwt-decode";
import { timeEntryApi } from "../../api/time_entry/time_entry.api";
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

export const getWorkingHourByDate = (date) => async (dispatch) => {
  const userId = jwtDecode(localStorage.getItem("token")).id;
  const responseBody = await timeEntryApi.getWorkingHourByDate(userId, date);
  if (responseBody.status === 200) {
    dispatch({
      type: GET_WORKING_HOUR_BY_DATE_SUCCESS,
      data: responseBody.data.resultObj,
    });
  } else {
    dispatch({ type: GET_WORKING_HOUR_BY_DATE_ERROR });
  }
};
export const getTimeEntriesByDate = (date) => async (dispatch) => {
  const userId = jwtDecode(localStorage.getItem("token")).id;
  const responseBody = await timeEntryApi.getTimeEntriesByDate(userId, date);
  if (responseBody.status === 200) {
    dispatch({
      type: GET_TIME_ENTRIES_BY_DATE_SUCCESS,
      data: responseBody.data.resultObj,
    });
  } else {
    dispatch({ type: GET_TIME_ENTRIES_BY_DATE_ERROR });
  }
};
export const getUserTimeEntry = () => async (dispatch) => {
  const userId = jwtDecode(localStorage.getItem("token")).id;
  const responseBody = await timeEntryApi.getUserTimeEntry(userId);
  if (responseBody.status === 200) {
    dispatch({
      type: GET_USER_TIME_ENTRY_SUCCESS,
      data: responseBody.data.resultObj,
    });
  } else {
    dispatch({ type: GET_USER_TIME_ENTRY_ERROR });
  }
};

export const addTimeEntry = (newTaskTimeEntryInfo) => async (dispatch) => {
  const responseBody = await timeEntryApi.addTimeEntry(newTaskTimeEntryInfo);
  if (responseBody.status === 200) {
    dispatch({
      type: ADD_TIME_ENTRY_SUCCESS,
      data: responseBody.data.resultObj,
    });
  } else {
    dispatch({ type: ADD_TIME_ENTRY_ERROR });
  }
};

export const deleteTimeEntry = (timeEntryId) => async (dispatch) => {
  const userId = jwtDecode(localStorage.getItem("token")).id;
  const responseBody = await timeEntryApi.deleteTimeEntry(userId, timeEntryId);
  if (responseBody.status === 200) {
    dispatch({
      type: DELETE_TIME_ENTRY_SUCCESS,
      data: responseBody.data.resultObj,
    });
  } else {
    dispatch({ type: DELETE_TIME_ENTRY_ERROR });
  }
};
