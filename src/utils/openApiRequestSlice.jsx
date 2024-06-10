import { createSlice } from "@reduxjs/toolkit";

const openApiRequestSlice = createSlice({
  name: "openApiRequest",
  initialState: {
    isApiRequestOpen: false,
  },
  reducers: {
    toggleApiRequest: (state) => {
      state.isApiRequestOpen = !state.isApiRequestOpen;
    },
    closeApiRequest: (state) => {
      state.isApiRequestOpen = false;
    },
  },
});

export const { toggleApiRequest, closeApiRequest } = openApiRequestSlice.actions;
export default openApiRequestSlice.reducer;
