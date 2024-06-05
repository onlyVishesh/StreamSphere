import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice";
import filterSlice from "./filterSlice";
import searchSlice from "./searchSlice";
import chatSlice from "./chatSlice";
import watchLaterSlice from "./watchLaterSlice";
const store = configureStore({
  reducer: {
    app: appSlice,
    filter: filterSlice,
    search: searchSlice,
    chat: chatSlice,
    watchLater: watchLaterSlice
  },
});

export default store;
