import { configureStore } from "@reduxjs/toolkit";
import alertSlice from "./alert/alert-slice";
import authSlice from "./auth/auth-slice";
import skillSlice from "./skill/skill-slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    alert: alertSlice.reducer,
    skill: skillSlice.reducer,
  },
});

export default store;
