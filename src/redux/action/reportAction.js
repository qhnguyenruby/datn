import jwtDecode from "jwt-decode";
import { reportApi } from "../../api/report/report.api";
import {
  GET_PERSONAL_REPORT_ERROR,
  GET_PERSONAL_REPORT_SUCCESS,
  GET_TEAM_REPORT_ERROR,
  GET_TEAM_REPORT_SUCCESS,
  GET_REPORT_SUCCESS,
  GET_REPORT_ERROR,
} from "../../constants/common";

export const getPersonalReport = (dateStart, dateEnd) => async (dispatch) => {
  const userId = jwtDecode(localStorage.getItem("token")).id;
  const responseBody = await reportApi.getPersonalReport(
    userId,
    dateStart,
    dateEnd
  );
  if (responseBody.status === 200) {
    dispatch({
      type: GET_PERSONAL_REPORT_SUCCESS,
      data: responseBody.data.resultObj,
    });
  } else {
    dispatch({ type: GET_PERSONAL_REPORT_ERROR });
  }
};

export const getTeamReport = (dateStart, dateEnd) => async (dispatch) => {
  const userId = jwtDecode(localStorage.getItem("token")).id;
  const responseBody = await reportApi.getTeamReport(
    userId,
    dateStart,
    dateEnd
  );
  if (responseBody.status === 200) {
    dispatch({
      type: GET_TEAM_REPORT_SUCCESS,
      data: responseBody.data.resultObj,
    });
  } else {
    dispatch({ type: GET_TEAM_REPORT_ERROR });
  }
};

export const getReport = (dateStart, dateEnd) => async (dispatch) => {
  const responseBody = await reportApi.getReport(dateStart, dateEnd);
  if (responseBody.status === 200) {
    dispatch({
      type: GET_REPORT_SUCCESS,
      data: responseBody.data.resultObj,
    });
  } else {
    dispatch({ type: GET_REPORT_ERROR });
  }
};
