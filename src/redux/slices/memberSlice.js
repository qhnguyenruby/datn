import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const memberSlice = createSlice({
  name: "members",
  initialState,
  reducers: {
    deleteMember: (state, action) => {
      return state.filter((member) => member.id !== action.payload);
    },

    setMember: (state, action) => [...action.payload],
    addMember: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { deleteMember, setMember,addMember } = memberSlice.actions;
export const selectMembers = (state) => state.members;
export default memberSlice.reducer;
