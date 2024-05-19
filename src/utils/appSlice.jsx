import { createSlice } from "@reduxjs/toolkit";
const appSlice = createSlice({
  name: "app",
  initialState: {
    isMenuOpen: true,
    filterId: 0,
  },
  reducers: {
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
    closeMenu: (state) => {
      state.isMenuOpen = false;
    },
    changeFilterId: (state, action) => {
      state.filterId = action.payload;
    },
  },
});

export const { toggleMenu, closeMenu, changeFilterId } = appSlice.actions;
export default appSlice.reducer;
