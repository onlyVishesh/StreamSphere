import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  apiKey: null,
};

const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {
    changeApi: (state, action) => {
      state.apiKey = action.payload;
    },
  },
});

export const { changeApi } = apiSlice.actions;
export const key = (state) => state.api.apiKey;
export default apiSlice.reducer;
