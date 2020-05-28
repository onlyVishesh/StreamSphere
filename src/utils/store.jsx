import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice";
import filterSlice from "./filterSlice";
import searchSlice from "./searchSlice";
import chatSlice from "./chatSlice";
const store = configureStore({
  reducer: {
    app: appSlice,
    filter: filterSlice,
    search: searchSlice,
    chat: chatSlice,
  },
});

export default store;
