import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
} from "../../constants/common";
const initialState = {
  isLogin: false,
  message: "",
  token: "",
};

export const accountReducer = (state = initialState, payload) => {
  switch (payload.type) {
    case LOGIN_SUCCESS:
      return { ...state, token: payload.data, isLogin: true };
    case LOGIN_ERROR:
      return { ...state, message: "Login Fail!" };
    case REGISTER_SUCCESS:
      return {
        ...state,
        token: payload.data,
        isSuccess: true,
      };
    case REGISTER_ERROR:
      return { ...state, message: "Register Fail!" };
    default:
      return state;
  }
};
