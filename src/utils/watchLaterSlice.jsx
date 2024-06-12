import { createSlice } from "@reduxjs/toolkit";

const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("watchLater");
    if (serializedState === null) {
      return {};
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Could not load state from local storage", err);
    return {};
  }
};

const saveStateToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("watchLater", serializedState);
  } catch (err) {
    console.error("Could not save state to local storage", err);
  }
};

const initialState = loadStateFromLocalStorage();

const watchLaterSlice = createSlice({
  name: "watchLater",
  initialState,
  reducers: {
    addWatchLater: (state, action) => {
      const newState = { ...action.payload, ...state };
      saveStateToLocalStorage(newState);
      return newState;
    },
    removeWatchLater: (state, action) => {
      const id = action.payload;
      const newState = { ...state };
      delete newState[id];
      saveStateToLocalStorage(newState);
      return newState;
    },
  },
});

export const { addWatchLater, removeWatchLater } = watchLaterSlice.actions;
export default watchLaterSlice.reducer;
