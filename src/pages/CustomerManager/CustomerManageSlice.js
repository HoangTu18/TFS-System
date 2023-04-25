import { createSlice } from "@reduxjs/toolkit";

export const CustomerManageSlice = createSlice({
  name: "customerManage",
  initialState: {
    listCustomer: [],
  },
  reducers: {
    //Get All Customer
    getCustomerRequest: (state) => {
      return state;
    },
    getCustomerSuccess: (state, action) => {
      state.listCustomer = action.payload;
    },
    getCustomerFailure: (state) => {
      return state;
    },
    //Update Customer
    updateCustomerRequest:(state)=>{
    },
    updateCustomerFailure:(state)=>{
    },
    //Delete Customer
    deleteCustomerRequest: (state) => {},
    deleteCustomerFaiture: (state) => {
      return state;
    },
  },
});
export const {
  getCustomerRequest,
  getCustomerSuccess,
  getCustomerFailure,
  updateCustomerRequest,
  updateCustomerFailure,
  deleteCustomerRequest,
  deleteCustomerFaiture,
} = CustomerManageSlice.actions;

export default CustomerManageSlice.reducer
