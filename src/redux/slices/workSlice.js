import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const workSlice = createSlice({
  name: "works",
  initialState,
  reducers: {
    setWorks: (state, action) => [...action.payload],
  },
});

export const { setWorks } = workSlice.actions;

export default workSlice.reducer;
