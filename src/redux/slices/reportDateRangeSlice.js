import { createSlice } from "@reduxjs/toolkit";

const initialState = [undefined, undefined];

const reportDateRangeSlice = createSlice({
  name: "reportDateRange",
  initialState,
  reducers: {
    setReportDateRange: (state, action) => {
      return action.payload;
    },
  },
});

export const { setReportDateRange } = reportDateRangeSlice.actions;

export default reportDateRangeSlice.reducer;
