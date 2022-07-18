import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loadingWork: false,
};

const loadingSlice = createSlice({
  name: "loadings",
  initialState,
  reducers: {
    setWorkingLoading: (state, action) => {
      state.loadingWork = action.payload;
    },
  },
});

export const { setWorkingLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
