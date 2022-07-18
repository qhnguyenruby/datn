import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listUser: [],
  listProject: [],
};

const reportPageSlice = createSlice({
  name: "reportPageData",
  initialState,
  reducers: {
    setReportPageData: (state, action) => {
      return action.payload;
    },
  },
});

export const { setReportPageData } = reportPageSlice.actions;

export default reportPageSlice.reducer;
