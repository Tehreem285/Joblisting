import { createSlice } from "@reduxjs/toolkit";

const jobslice = createSlice({
    name : 'job',
    initialState : {
        job : [],
        loader : false
    },

  reducers : {
    setJob : (state ,action) => {
        state.job = action.payload;
    },
    addJob : (state , action ) => {
        state.job = [...state.job , action.payload];
    },
  },
})

export const {setJob , addJob} = jobslice.actions;
export default jobslice.reducer;