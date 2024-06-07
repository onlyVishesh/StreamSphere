import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice";
import chatSlice from "./chatSlice";
import filterSlice from "./filterSlice";
import likeDislikeSlice from "./likeDislikeSlice";
import searchSlice from "./searchSlice";
import watchLaterSlice from "./watchLaterSlice";
import historySlice from "./historySlice";
const store = configureStore({
  reducer: {
    app: appSlice,
    filter: filterSlice,
    search: searchSlice,
    chat: chatSlice,
    watchLater: watchLaterSlice,
    likeDislike: likeDislikeSlice,
    history: historySlice,
  },
});

export default store;
