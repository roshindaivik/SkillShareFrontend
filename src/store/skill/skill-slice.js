import { createSlice } from "@reduxjs/toolkit";

const skillSlice = createSlice({
  name: "skill",
  initialState: {
    skills: [],
  },
  reducers: {
    addSkills(state, action) {
      state.skills = [...state.skills, ...action.payload.skills];
    },
  },
});

export const skillActions = skillSlice.actions;

export default skillSlice;
