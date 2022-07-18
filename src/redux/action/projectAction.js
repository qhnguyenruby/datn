import jwtDecode from "jwt-decode";
import { projectApi } from "../../api/project/project.api";
import {
  GET_WORKING_PROJECTS_SUCCESS,
  GET_WORKING_PROJECTS_ERROR,
  CREATE_NEW_PROJECT_SUCCESS,
  CREATE_NEW_PROJECT_ERROR,
  EDIT_PROJECT_SUCCESS,
  EDIT_PROJECT_ERROR,
  GET_PM_PROJECTS_SUCCESS,
  GET_PM_PROJECTS_ERROR,
  GET_PM_PROJECT_DETAIL_SUCCESS,
  GET_PM_PROJECT_DETAIL_ERROR,
  GET_PROJECT_EDIT_DETAIL_SUCCESS,
  GET_PROJECT_EDIT_DETAIL_ERROR,
  ARCHIVE_A_PROJECT_SUCCESS,
  ARCHIVE_A_PROJECT_ERROR,
  UNARCHIVE_A_PROJECT_SUCCESS,
  UNARCHIVE_A_PROJECT_ERROR,
} from "../../constants/common";

export const getWorkingProject = () => async (dispatch) => {
  const userId = jwtDecode(localStorage.getItem("token")).id;
  const responseBody = await projectApi.getWorkingProject(userId);
  if (responseBody.status === 200) {
    dispatch({
      type: GET_WORKING_PROJECTS_SUCCESS,
      data: responseBody.data.resultObj,
    });
  } else {
    dispatch({ type: GET_WORKING_PROJECTS_ERROR });
  }
};

export const getPMProject =
  (userId, search, page = 1, numPerPage = 10) =>
  async (dispatch) => {
    const responseBody = await projectApi.getPMProject(
      userId,
      search,
      page,
      numPerPage
    );
    if (responseBody.status === 200) {
      dispatch({
        type: GET_PM_PROJECTS_SUCCESS,
        data: responseBody.data.resultObj,
      });
    } else {
      dispatch({ type: GET_PM_PROJECTS_ERROR });
    }
  };
export const getPMProjectDetail = (projectId) => async (dispatch) => {
  const userId = jwtDecode(localStorage.getItem("token")).id;
  const responseBody = await projectApi.getPMProjectDetail(userId, projectId);
  if (responseBody.status === 200) {
    dispatch({
      type: GET_PM_PROJECT_DETAIL_SUCCESS,
      data: responseBody.data.resultObj,
    });
  } else {
    dispatch({ type: GET_PM_PROJECT_DETAIL_ERROR });
  }
};
export const getProjectEditDetail = (projectId) => async (dispatch) => {
  const userId = jwtDecode(localStorage.getItem("token")).id;
  const responseBody = await projectApi.getProjectEditDetail(userId, projectId);
  if (responseBody.status === 200) {
    dispatch({
      type: GET_PROJECT_EDIT_DETAIL_SUCCESS,
      data: responseBody.data.resultObj,
    });
  } else {
    dispatch({ type: GET_PROJECT_EDIT_DETAIL_ERROR });
  }
};

export const createNewProject =
  (userId, newProjectInfo) => async (dispatch) => {
    const responseBody = await projectApi.createNewProject(
      userId,
      newProjectInfo
    );
    if (responseBody.status === 200) {
      dispatch({ type: CREATE_NEW_PROJECT_SUCCESS, data: newProjectInfo });
    } else {
      dispatch({ type: CREATE_NEW_PROJECT_ERROR });
    }
  };

export const editProject = (userId, newProjectInfo) => async (dispatch) => {
  const responseBody = await projectApi.editProject(userId, newProjectInfo);
  if (responseBody.status === 200) {
    dispatch({ type: EDIT_PROJECT_SUCCESS, data: newProjectInfo });
  } else {
    dispatch({ type: EDIT_PROJECT_ERROR });
  }
};

export const archiveAProject = (projectId) => async (dispatch) => {
  const userId = jwtDecode(localStorage.getItem("token")).id;
  const responseBody = await projectApi.archiveAProject(userId, projectId);
  if (responseBody.status === 200) {
    dispatch({ type: ARCHIVE_A_PROJECT_SUCCESS });
  } else {
    dispatch({ type: ARCHIVE_A_PROJECT_ERROR });
  }
};

export const unarchiveAProject = (projectId) => async (dispatch) => {
  const userId = jwtDecode(localStorage.getItem("token")).id;
  const responseBody = await projectApi.unarchiveAProject(userId, projectId);
  if (responseBody.status === 200) {
    dispatch({ type: UNARCHIVE_A_PROJECT_SUCCESS });
  } else {
    dispatch({ type: UNARCHIVE_A_PROJECT_ERROR });
  }
};

export const setProjectEdit = (projectEdit) => async (dispatch) => {
  dispatch({ type: "SET_PROJECT_EDIT", data: projectEdit });
};

// export const updateDepartment = (department) => async dispatch => {
//     // dispatch({type: GET_DEPARTMENT_REQUEST});
//     const responseBody = await departmentApi.updateDepartment(department);
//     if(responseBody.status === 200){
//         dispatch({type: EDIT_DEPARTMENT_SUCCESS, data: responseBody.data});
//     }else{
//         dispatch({type: EDIT_DEPARTMENT_ERROR});
//     }
// }

// export const deleteDepartment = (departmentId) => async dispatch => {
//     // dispatch({type: GET_DEPARTMENT_REQUEST});
//     const responseBody = await departmentApi.deleteDepartment(departmentId);
//     if(responseBody.status === 200){
//         dispatch({type: DELETE_DEPARTMENT_SUCCESS, data: responseBody.data});
//     }else{
//         dispatch({type: DELETE_DEPARTMENT_ERROR});
//     }
// }
