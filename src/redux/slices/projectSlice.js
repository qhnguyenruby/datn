import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    addProjects: (state, action) => {
      state.push(action.payload);
    },
    deleteProject: (state, action) => {
      return state.filter((project) => project.id !== action.payload);
    },

    editProject: (state, action) => {
      const projectIndex = state.findIndex(
        (project) => project.id === action.payload.id
      );
      if (projectIndex >= 0) {
        state[projectIndex] = action.payload;
      }
    },
  },
});

export const { addProjects, deleteProject, editProject } =
  projectSlice.actions;
export const selectProject = (state) => state.project;
export default projectSlice.reducer;
