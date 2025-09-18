import { configureStore } from "@reduxjs/toolkit";
import authslice from "./auth/authslice";
import jobslice from "./jobs/jobslice";

const store = configureStore({
  reducer: {
   auth: authslice,
   job: jobslice,
  }
});

export default store;