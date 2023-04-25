import { createSlice } from "@reduxjs/toolkit";

export const ServiceManageSlice = createSlice({
  name: "serviceManage",
  initialState: {
    listService: [],
  },
  reducers: {
    // Get Service
    getServiceRequest: (state) => {
      return state;
    },
    getServiceSuccess: (state, action) => {
      state.listService = action.payload;
    },
    getServiceFailure: (state) => {
      return state;
    },
    // Create Service
    insertServiceRequest: (state, action) => {},
    insertServiceFaiture: (state) => {
      return state;
    },
    //Update Service
    updateServiceRequest: (state, action) => {},
    updateServiceFailure: (state) => {
      return state;
    },
    //Delete Service
    deleteServiceRequest: (state) => {},
    deleteServiceFailure: (state) => {
      return state;
    },
  },
});

export const {
  getServiceRequest,
  getServiceSuccess,
  getServiceFailure,
  insertServiceRequest,
  insertServiceFaiture,
  updateServiceRequest,
  updateServiceFailure,
  deleteServiceRequest,
  deleteServiceFailure,
} = ServiceManageSlice.actions;

export default ServiceManageSlice.reducer;
