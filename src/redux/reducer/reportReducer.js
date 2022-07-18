import {
  GET_PERSONAL_REPORT_ERROR,
  GET_PERSONAL_REPORT_SUCCESS,
  GET_TEAM_REPORT_ERROR,
  GET_TEAM_REPORT_SUCCESS,
  GET_REPORT_SUCCESS,
  GET_REPORT_ERROR,
} from "../../constants/common";
const initialState = {
  personalReport: {
    dataBar: [],
    dataPie: [],
  },
  teamReport: {
    dataBar: [],
    dataPie: [],
  },
  pmReport: {},
};

export const reportReducer = (state = initialState, payload) => {
  switch (payload.type) {
    case GET_PERSONAL_REPORT_SUCCESS:
      return { ...state, personalReport: payload.data, isSuccess: true };
    case GET_PERSONAL_REPORT_ERROR:
      return { ...state, message: "Get personal report Fail!" };
    case GET_TEAM_REPORT_SUCCESS:
      return {
        ...state,
        teamReport: payload.data,
        isSuccess: true,
      };
    case GET_TEAM_REPORT_ERROR:
      return { ...state, message: "Get team report Fail!" };
    case GET_REPORT_SUCCESS:
      return {
        ...state,
        pmReport: payload.data,
        isSuccess: true,
      };
    case GET_REPORT_ERROR:
      return { ...state, message: "Get PM report Fail!" };

    default:
      return state;
  }
};
