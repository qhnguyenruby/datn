import {
  GET_WORKING_PROJECTS_SUCCESS,
  GET_WORKING_PROJECTS_ERROR,
  CREATE_NEW_PROJECT_SUCCESS,
  CREATE_NEW_PROJECT_ERROR,
  GET_PM_PROJECTS_SUCCESS,
  GET_PM_PROJECTS_ERROR,
  GET_PM_PROJECT_DETAIL_SUCCESS,
  GET_PM_PROJECT_DETAIL_ERROR,
  ARCHIVE_A_PROJECT_SUCCESS,
  ARCHIVE_A_PROJECT_ERROR,
  UNARCHIVE_A_PROJECT_SUCCESS,
  UNARCHIVE_A_PROJECT_ERROR,
  GET_PROJECT_EDIT_DETAIL_SUCCESS,
  GET_PROJECT_EDIT_DETAIL_ERROR,
  EDIT_PROJECT_SUCCESS,
  EDIT_PROJECT_ERROR,
} from "../../constants/common";
const initialState = {
  isSuccess: true,
  message: "",
  workingProjects: [],
  pmProjects: [],
  pmProjectDetail: {},
  projectEdit: {},
};

export const projectReducer = (state = initialState, payload) => {
  switch (payload.type) {
    case GET_WORKING_PROJECTS_SUCCESS:
      return { ...state, workingProjects: payload.data, isSuccess: true };
    case GET_WORKING_PROJECTS_ERROR:
      return { ...state, message: "Get Working Projects Fail!" };
    case CREATE_NEW_PROJECT_SUCCESS:
      return {
        ...state,
        workingProjects: state.push(payload.data),
        isSuccess: true,
      };
    case CREATE_NEW_PROJECT_ERROR:
      return { ...state, message: "Add new Project Fail!" };
    case EDIT_PROJECT_SUCCESS:
      return {
        ...state,
        // workingProjects: state.push(payload.data),
        isSuccess: true,
      };
    case EDIT_PROJECT_ERROR:
      return { ...state, message: "Edit project Fail!" };
    case GET_PM_PROJECTS_SUCCESS:
      return { ...state, pmProjects: payload.data, isSuccess: true };
    case GET_PM_PROJECTS_ERROR:
      return { ...state, message: "Get PM Projects Fail!" };
    case GET_PM_PROJECT_DETAIL_SUCCESS:
      return { ...state, pmProjectDetail: payload.data, isSuccess: true };
    case GET_PM_PROJECT_DETAIL_ERROR:
      return { ...state, message: "Get PM Project details Fail!" };
    case GET_PROJECT_EDIT_DETAIL_SUCCESS:
      return { ...state, projectEdit: payload.data, isSuccess: true };
    case GET_PROJECT_EDIT_DETAIL_ERROR:
      return { ...state, message: "Get Project Edit details Fail!" };
    case ARCHIVE_A_PROJECT_SUCCESS:
      return { ...state, pmProjectDetail: payload.data, isSuccess: true };
    case ARCHIVE_A_PROJECT_ERROR:
      return { ...state, message: "Archive a project failed!" };
    case UNARCHIVE_A_PROJECT_SUCCESS:
      return { ...state, pmProjectDetail: payload.data, isSuccess: true };
    case UNARCHIVE_A_PROJECT_ERROR:
      return { ...state, message: "Unarchive a project failed!" };
    // case DELETE_DEPARTMENT_SUCCESS:
    //     const departmentsHaveDel = deleteDepartment(state.departments, payload.data)
    //     return {...state, departments: departmentsHaveDel, isSuccess: true}
    // case DELETE_DEPARTMENT_ERROR:
    //     return {...state, message: "Delete Departments Fail!"}
    default:
      return state;
  }
};
