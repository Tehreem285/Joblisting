import { createSlice } from "@reduxjs/toolkit";

const jobslice = createSlice({
    name : 'job',
    initialState : {
        allJobs : [],
        userJobs : [],
        loader : false
    },

  reducers : {
   setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },

    // set user jobs (for UserJobs modal/page)
    setUserJobs: (state, action) => {
      state.userJobs = action.payload;
    },

    // add new job (will update both lists if needed)
    addJob: (state, action) => {
      state.allJobs = [...state.allJobs, action.payload];
      state.userJobs = [...state.userJobs, action.payload];
    },
     removeJob: (state, action) => {
      state.allJobs = state.allJobs.filter((job) => job.id !== action.payload);
      state.userJobs = state.userJobs.filter((job) => job.id !== action.payload);
    },
  },
})

export const {setAllJobs ,setUserJobs, addJob , removeJob} = jobslice.actions;
export default jobslice.reducer;