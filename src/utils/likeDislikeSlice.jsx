import { createSlice } from "@reduxjs/toolkit";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("likeDislikeState");
    if (serializedState === null) {
      return {
        liked: {},
        disliked: {},
      };
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error("Failed to load state from local storage:", error);
    return {
      liked: {},
      disliked: {},
    };
  }
};

// Function to save state to local storage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("likeDislikeState", serializedState);
  } catch (error) {
    console.error("Failed to save state to local storage:", error);
  }
};

const likeDislikeSlice = createSlice({
  name: "likeDislikeSlice",
  initialState: loadState(),
  reducers: {
    likeItem: (state, action) => {
      const [id, value] = Object.entries(action.payload)[0];
      delete state.disliked[id];
      state.liked = { [id]: value, ...state.liked };
      saveState(state);
    },
    dislikeItem: (state, action) => {
      const [id, value] = Object.entries(action.payload)[0];
      delete state.liked[id];
      state.disliked = { [id]: value, ...state.disliked };
      saveState(state);
    },
    removeLike: (state, action) => {
      const id = action.payload;
      delete state.liked[id];
      saveState(state);
    },
    removeDislike: (state, action) => {
      const id = action.payload;
      delete state.disliked[id];
      saveState(state);
    },
  },
});

export const { likeItem, dislikeItem, removeLike, removeDislike } =
  likeDislikeSlice.actions;
export default likeDislikeSlice.reducer;
