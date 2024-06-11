import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMenuOpen: true,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
    closeMenu: (state) => {
      state.isMenuOpen = false;
    },
    closeMenuIfWidthLessThan1024: (state) => {
      if (window.innerWidth < 1024) {
        state.isMenuOpen = false;
      }
    },
  },
});

export const { toggleMenu, closeMenu, closeMenuIfWidthLessThan1024 } =
  appSlice.actions;
export default appSlice.reducer;
