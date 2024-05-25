import { createSlice } from "@reduxjs/toolkit";
const filterSlice = createSlice({
  name: "filter",
  initialState: {
    filterId: 0,
  },
  reducers: {
    changeFilterId: (state, action) => {
      state.filterId = action.payload;
    },
  },
});

export const { changeFilterId } = filterSlice.actions;
export default filterSlice.reducer;
