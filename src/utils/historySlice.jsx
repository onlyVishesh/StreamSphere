import { createSlice } from "@reduxjs/toolkit";

const historySlice = createSlice({
  name: "history",
  initialState: {},
  reducers: {
    addHistory: (state, action) => {
      const newState = { ...action.payload, ...state };
      return newState;
    },
    removeHistory: (state, action) => {
      const id = action.payload;
      delete state[id];
    },
    clearHistory: (state) => {
      return {};
    },
  },
});

export const { addHistory, removeHistory, clearHistory } = historySlice.actions;
export default historySlice.reducer;
