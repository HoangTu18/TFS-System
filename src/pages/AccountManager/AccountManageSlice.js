import { createSlice } from "@reduxjs/toolkit";

export const accountManageSlice = createSlice({
  name: "accountManage",
  initialState: {
    listAccount: [],
    listRole: [],
  },
  reducers: {
    //Get All Staff
    getAccountRequest: (state) => {
      return state;
    },
    getAccountSuccess: (state, action) => {
      state.listAccount = action.payload;
      state.isLoading = false;
    },
    getAccountFailure: (state) => {
      return state;
    },
    //Get All Role
    getRoleRequest: (state) => {
      state.isLoading = true;
    },
    getRoleSuccess: (state, action) => {
      state.listRole = action.payload;
      state.isLoading = false;
    },
    getRoleFailure: (state) => {
      return state;
    },
    //Create Staff
    createAccountRequest: (state, action) => {},
    //Update Staff
    updateStaffRequest: (state, action) => {},
    //Delete Staff
    deleteStaffRequest: (state, action) => {},
  },
});

export const {
  getAccountRequest,
  getAccountSuccess,
  getAccountFailure,
  getRoleRequest,
  getRoleSuccess,
  getRoleFailure,
  createAccountRequest,
  updateStaffRequest,
  deleteStaffRequest
} = accountManageSlice.actions;

export default accountManageSlice.reducer;
