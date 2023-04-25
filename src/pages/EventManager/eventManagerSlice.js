import { createSlice } from "@reduxjs/toolkit";

export const eventManageSlice = createSlice({
  name: "eventManage",
  initialState: {
    listEvent: [],
    isLoading: false,
  },
  reducers: {
    //Get All Event
    getEventRequest: (state) => {
      return state;
    },
    getEventSuccess: (state, action) => {
      state.listEvent = action.payload;
      state.isLoading = false;
    },
    getEventFailure: (state) => {
      return state;
    },

    insertEventRequest: (state, action) => {},

    updateEventRequest: (state, action) => {},

    deleteEventRequest: (state, action) => {},
  },
});

export const {
  getEventRequest,
  getEventSuccess,
  getEventFailure,
  insertEventRequest,
  updateEventRequest,
  deleteEventRequest,
} = eventManageSlice.actions;

export default eventManageSlice.reducer;
