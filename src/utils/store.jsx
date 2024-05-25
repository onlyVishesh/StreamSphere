import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice";
import filterSlice from "./filterSlice";
const store = configureStore({
  reducer: {
    app: appSlice,
    filter: filterSlice,
  },
});

export default store;
