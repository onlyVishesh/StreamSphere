import { createSlice } from "@reduxjs/toolkit";

const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('subscriptions');
    if (serializedState === null) {
      return {};
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Could not load state from local storage', err);
    return {};
  }
};

const saveStateToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('subscriptions', serializedState);
  } catch (err) {
    console.error('Could not save state to local storage', err);
  }
};

const initialState = loadStateFromLocalStorage();

const subscriptionsSlice = createSlice({
  name: "subscriptions",
  initialState,
  reducers: {
    addSubscription: (state, action) => {
      const newState = { ...state, ...action.payload };
      saveStateToLocalStorage(newState);
      return newState;
    },
    removeSubscription: (state, action) => {
      const id = action.payload;
      const newState = { ...state };
      delete newState[id];
      saveStateToLocalStorage(newState);
      return newState;
    },
  },
});

export const { addSubscription, removeSubscription } = subscriptionsSlice.actions;
export default subscriptionsSlice.reducer;
