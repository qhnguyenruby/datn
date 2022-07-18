import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const listProjectSlice = createSlice({
  name: "listprojects",
  initialState,
  reducers: {
    setListProjects: (state, action) => [...action.payload],
  },
});

export const { setListProjects } = listProjectSlice.actions;
export const selectListProjects = (state) => state.listprojects;
export default listProjectSlice.reducer;
