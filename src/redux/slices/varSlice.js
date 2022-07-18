import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const initialState = {
  currentDate: moment().format("DD-MM-YYYY"),
};

const varSlice = createSlice({
  name: "vars",
  initialState,
  reducers: {
    setCurrentDate: (state, action) => {
      state.currentDate = action.payload;
    },
  },
});

export const { setCurrentDate } = varSlice.actions;

export default varSlice.reducer;
