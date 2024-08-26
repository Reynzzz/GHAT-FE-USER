// src/store/sidebarSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isOpen = !state.isOpen;
    },
    openSidebar: (state) => {
      state.isOpen = true;
    },
    closeSidebar: (state) => {
      state.isOpen = false;
    },
    toggleIsLogging: (state) => {
      state.isLogging = !state.isLogging;
    },
    setIsLogging: (state, action) => {
      state.isLogging = action.payload;
    },
  },
});

export const { toggleSidebar, openSidebar, closeSidebar,toggleIsLogging, setIsLogging } =
  sidebarSlice.actions;

export default sidebarSlice.reducer;
