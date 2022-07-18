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
const initialState = {
  isSuccess: true,
  message: "",
  users: [],
  user: {
    userId: "",
    userName: "",
    email: "",
    avatarUrl: "",
    isActive: true,
  },
  adminUsers: {},
};

export const userReducer = (state = initialState, payload) => {
  switch (payload.type) {
    case GET_ALL_USER_SUCCESS:
      return { ...state, users: payload.data, isSuccess: true };
    case GET_ALL_USER_ERROR:
      return { ...state, message: "Get All Users Fail!" };
    case GET_ALL_USERS_SUCCESS:
      return { ...state, adminUsers: payload.data, isSuccess: true };
    case GET_ALL_USERS_ERROR:
      return { ...state, message: "Get All Users Fail!" };
    case GET_USER_BY_ID_SUCCESS:
      return { ...state, user: payload.data, isSuccess: true };
    case GET_USER_BY_ID_ERROR:
      return { ...state, message: "Get User Details Fail!" };
    case ACTIVE_USER_SUCCESS:
      return { ...state, isSuccess: true };
    case ACTIVE_USER_ERROR:
      return { ...state, message: "Active user failed!" };
    case DEACTIVE_USER_SUCCESS:
      return { ...state, isSuccess: true };
    case DEACTIVE_USER_ERROR:
      return { ...state, message: "Deactive user failed!" };
    case UPDATE_USER_ROLE_SUCCESS:
      return { ...state, isSuccess: true };
    case UPDATE_USER_ROLE_ERROR:
      return { ...state, message: "Update user role failed!" };
    case SEND_INVITATION_SUCCESS:
      return { ...state, isSuccess: true };
    case SEND_INVITATION_ERROR:
      return { ...state, message: "Send invitation failed!" };
    default:
      return state;
  }
};
