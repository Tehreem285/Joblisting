import { createSlice } from "@reduxjs/toolkit";

const authslice = createSlice({
    name : "auth",
    initialState : {
        user : null,
        loader : false,
        checking : true,
    },

    reducers: {
        setUser: (state , action) =>{
            state.user = action.payload
        },

        clearUser: (state) => {
            state.user = null;
        },

        setLoader: (state , action) => {
            state.loader = action.payload;
        },
        setChecking: (state , action) => {
            state.checking = action.payload;
        },
    },
});

export const {setUser , clearUser , setLoader, setChecking} = authslice.actions;
export default authslice.reducer;