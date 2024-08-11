import { createSlice } from "@reduxjs/toolkit";

//!Initial State
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("userInfo")) || null,
  },
  //1 Reducers
  reducers: {
    loginAction: (state, action) => {
      state.user = action.payload; 
      //payload is what we pass in the postman
      //That will be given to react query
    },
    //Logout
    logoutAction: (state) => {
      state.user = null;
    },
  },
});

// Generate actions
export const { loginAction, logoutAction } = authSlice.actions;

// Generate the reducers
const authReducer = authSlice.reducer;
export default authReducer;