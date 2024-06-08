import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice";
import chatSlice from "./chatSlice";
import filterSlice from "./filterSlice";
import historySlice from "./historySlice";
import likeDislikeSlice from "./likeDislikeSlice";
import searchSlice from "./searchSlice";
import subscriptionsSlice from "./subscriptionsSlice";
import watchLaterSlice from "./watchLaterSlice";
const store = configureStore({
  reducer: {
    app: appSlice,
    filter: filterSlice,
    search: searchSlice,
    chat: chatSlice,
    watchLater: watchLaterSlice,
    subscriptions: subscriptionsSlice,
    likeDislike: likeDislikeSlice,
    history: historySlice,
  },
});

export default store;
