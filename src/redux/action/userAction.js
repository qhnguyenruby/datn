import jwtDecode from "jwt-decode";
import { userApi } from "../../api/user/user.api";
import {
  GET_ALL_USER_SUCCESS,
  GET_ALL_USER_ERROR,
  GET_USER_BY_ID_SUCCESS,
  GET_USER_BY_ID_ERROR,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_ERROR,
  ACTIVE_USER_ERROR,
  ACTIVE_USER_SUCCESS,
  DEACTIVE_USER_SUCCESS,
  DEACTIVE_USER_ERROR,
  UPDATE_USER_ROLE_SUCCESS,
  UPDATE_USER_ROLE_ERROR,
  SEND_INVITATION_SUCCESS,
  SEND_INVITATION_ERROR,
} from "../../constants/common";

export const getAllUser = () => async (dispatch) => {
  const userId = jwtDecode(localStorage.getItem("token")).id;
  const responseBody = await userApi.getAllUser(userId);
  if (responseBody.status === 200) {
    dispatch({
      type: GET_ALL_USER_SUCCESS,
      data: responseBody.data.resultObj,
    });
  } else {
    dispatch({ type: GET_ALL_USER_ERROR });
  }
};

export const getAllUsers =
  (search, page = 1, numPerPage = 10) =>
  async (dispatch) => {
    const userId = jwtDecode(localStorage.getItem("token")).id;
    const responseBody = await userApi.getAllUsers(
      userId,
      search,
      page,
      numPerPage
    );
    if (responseBody.status === 200) {
      dispatch({
        type: GET_ALL_USERS_SUCCESS,
        data: responseBody.data.resultObj,
      });
    } else {
      dispatch({ type: GET_ALL_USERS_ERROR });
    }
  };

export const getUserById = () => async (dispatch) => {
  const userId = jwtDecode(localStorage.getItem("token")).id;
  const responseBody = await userApi.getUserById(userId);
  if (responseBody.status === 200) {
    dispatch({
      type: GET_USER_BY_ID_SUCCESS,
      data: responseBody.data.resultObj,
    });
  } else {
    dispatch({ type: GET_USER_BY_ID_ERROR });
  }
};

export const activeUser = (userIds) => async (dispatch) => {
  const responseBody = await userApi.activeUser(userIds);
  if (responseBody.status === 200) {
    dispatch({
      type: ACTIVE_USER_SUCCESS,
    });
  } else {
    dispatch({ type: ACTIVE_USER_ERROR });
  }
};

export const deactiveUser = (userIds) => async (dispatch) => {
  const responseBody = await userApi.deactiveUser(userIds);
  if (responseBody.status === 200) {
    dispatch({
      type: DEACTIVE_USER_SUCCESS,
    });
  } else {
    dispatch({ type: DEACTIVE_USER_ERROR });
  }
};

export const updateUserRole = (userId, role) => async (dispatch) => {
  // const userId = jwtDecode(localStorage.getItem("token")).id;
  const responseBody = await userApi.updateUserRole(userId, role);
  if (responseBody.status === 200) {
    dispatch({
      type: UPDATE_USER_ROLE_SUCCESS,
    });
  } else {
    dispatch({ type: UPDATE_USER_ROLE_ERROR });
  }
};

export const sendInvitation = (email) => async (dispatch) => {
  const responseBody = await userApi.sendInvitation(email);
  if (responseBody.status === 200) {
    dispatch({
      type: SEND_INVITATION_SUCCESS,
    });
  } else {
    dispatch({ type: SEND_INVITATION_ERROR });
  }
};
