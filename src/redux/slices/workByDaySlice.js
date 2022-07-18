import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const workByDaySlice = createSlice({
  name: "workByDay",
  initialState,
  reducers: {
    deleteWorkByDay: (state, action) => {
      return state.filter((work) => work.id !== action.payload);
    },
    setWorkByDay: (state, action) => [...action.payload],
    addWorkDone: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { deleteWorkByDay, setWorkByDay, addWorkDone } =
  workByDaySlice.actions;

export default workByDaySlice.reducer;
