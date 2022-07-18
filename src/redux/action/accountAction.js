import jwtDecode from "jwt-decode";
import { accountApi } from "../../api/account/account.api";
import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
} from "../../constants/common";

export const login = (loginModel) => async (dispatch) => {
  const responseBody = await accountApi.login(loginModel);
  if (responseBody.status === 200) {
    dispatch({
      type: LOGIN_SUCCESS,
      data: responseBody.data.resultObj,
    });
  } else {
    dispatch({ type: LOGIN_ERROR });
  }
};

export const register = (registerModel) => async (dispatch) => {
  const responseBody = await accountApi.register(registerModel);
  if (responseBody.status === 200) {
    dispatch({
      type: REGISTER_SUCCESS,
      data: responseBody.data.resultObj,
    });
  } else {
    dispatch({ type: REGISTER_ERROR });
  }
};
