import { createSlice } from "@reduxjs/toolkit";

const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("history");
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
    localStorage.setItem("history", serializedState);
  } catch (err) {
    console.error("Could not save state to local storage", err);
  }
};

const initialState = loadStateFromLocalStorage();

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    addHistory: (state, action) => {
      const newState = { ...state, ...action.payload };
      saveStateToLocalStorage(newState);
      return newState;
    },
    removeHistory: (state, action) => {
      const id = action.payload;
      const newState = { ...state };
      delete newState[id];
      saveStateToLocalStorage(newState);
      return newState;
    },
    clearHistory: () => {
      const newState = {};
      saveStateToLocalStorage(newState);
      return newState;
    },
  },
});

export const { addHistory, removeHistory, clearHistory } = historySlice.actions;
export default historySlice.reducer;
