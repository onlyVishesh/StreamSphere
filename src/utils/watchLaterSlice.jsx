import { createSlice } from "@reduxjs/toolkit";

const watchLaterSlice = createSlice({
  name: "watchLaterSlice",
  initialState: {},
  reducers: {
    addWatchLater: (state, action) => {
      const newState = { ...action.payload, ...state };
      return newState;
    },
    removeWatchLater: (state, action) => {
      const id = action.payload;
      delete state[id];
    },
  },
});

export const { addWatchLater, removeWatchLater } = watchLaterSlice.actions;
export default watchLaterSlice.reducer;
