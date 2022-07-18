import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const projectTrackTimeSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProjects: (state, action) => [...action.payload],
  },
});

export const { setProjects } = projectTrackTimeSlice.actions;
export const selectProjects = (state) => state.projects;
export default projectTrackTimeSlice.reducer;
