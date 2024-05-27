import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice";
import filterSlice from "./filterSlice";
import searchSlice from "./searchSlice";
const store = configureStore({
  reducer: {
    app: appSlice,
    filter: filterSlice,
    search: searchSlice,
  },
});

export default store;
