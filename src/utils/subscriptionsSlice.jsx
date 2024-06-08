import { createSlice } from "@reduxjs/toolkit";

const subscriptionsSlice = createSlice({
  name: "subscriptions",
  initialState: {},
  reducers: {
    addSubscription: (state, action) => {
      const newState = { ...action.payload, ...state };
      return newState;
    },
    removeSubscription: (state, action) => {
      const id = action.payload;
      delete state[id];
    },
  },
});

export const { addSubscription, removeSubscription } =
  subscriptionsSlice.actions;
export default subscriptionsSlice.reducer;
