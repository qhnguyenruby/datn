import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const projectEditSlice = createSlice({
  name: "projectEdit",
  initialState,
  reducers: {
    setProjectEdit: (state, action) => action.payload,
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

export const { setProjectEdit, editProject } = projectEditSlice.actions;
export const selectProjectEdit = (state) => state.projectEdit;
export default projectEditSlice.reducer;
