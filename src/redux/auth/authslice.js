import { createSlice } from "@reduxjs/toolkit";

const authslice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    signuploader: false,
    loginloader: false,
    checking: true,
  },

  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },

    clearUser: (state) => {
      state.user = null;
    },

    setLoginloader: (state, action) => {
      state.loginloader = action.payload;
    },
    setSignuploader: (state, action) => {
      state.signuploader = action.payload;
    },
    setChecking: (state, action) => {
      state.checking = action.payload;
    },
    setProfilePic: (state, action) => {
      if (state.user) {
        state.user.profilePic = action.payload;
      }
    },
  },
});

export const {
  setUser,
  clearUser,
  setSignuploader,
  setLoginloader,
  setChecking,
  setProfilePic,
} = authslice.actions;
export default authslice.reducer;
