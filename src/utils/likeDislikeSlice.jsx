import { createSlice } from "@reduxjs/toolkit";

const likeDislikeSlice = createSlice({
  name: "likeDislikeSlice",
  initialState: {
    liked: {},
    disliked: {},
  },
  reducers: {
    likeItem: (state, action) => {
      const id = Object.keys(action.payload);
      delete state.disliked[id];
      state.liked[id] = Object.values(action.payload);
    },
    dislikeItem: (state, action) => {
      const id = Object.keys(action.payload);
      delete state.liked[id];
      state.disliked[id] = Object.values(action.payload);
    },
    removeLike: (state, action) => {
      const id = action.payload;
      delete state.liked[id];
    },
    removeDislike: (state, action) => {
      const id = action.payload;
      delete state.disliked[id];
    },
  },
});

export const { likeItem, dislikeItem, removeLike, removeDislike } =
  likeDislikeSlice.actions;
export default likeDislikeSlice.reducer;
