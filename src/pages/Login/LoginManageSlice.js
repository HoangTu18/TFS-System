import { createSlice } from "@reduxjs/toolkit";

export const LoginManageSlice = createSlice({
  name: "login",
  initialState: {
    userInfo: {},
    errMessage: "",
  },
  reducers: {
    loginRequest: (state,action) => {},
    loginSuccess: (state, action) => {
      state.infoLogin = action.payload;
      state.errMessage = "";
    },
    loginFailute: (state, action) => {
      state.errMessage = action.payload;
    },
  },
});

export const { loginRequest, loginSuccess, loginFailute } =
  LoginManageSlice.actions;

export default LoginManageSlice.reducer;
