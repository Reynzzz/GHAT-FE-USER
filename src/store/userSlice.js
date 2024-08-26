import { createSlice } from "@reduxjs/toolkit";
import CryptoJS from "crypto-js"; // Import CryptoJS

// Secret key for encryption/decryption
const SECRET_KEY = 'secret-key';

// Function to decrypt values
const decrypt = (cipherText) => {
  if (!cipherText) return '';
  const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

// Decrypt the values from localStorage
const access_token = decrypt(localStorage.getItem('access_token')) || '';
const userRole = decrypt(localStorage.getItem('user')) || '';
const userCategory = decrypt(localStorage.getItem('user2')) || '';

const initialState = {
  userType: userRole.role,
  isLogging: !access_token,
  userCategory: userCategory,
  dataUser: {}
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleIsLogging: (state) => {
      state.isLogging = !state.isLogging;
    },
    setIsLogging: (state, action) => {
      state.isLogging = action.payload;
    },
    toggleSidebar: (state) => {
      state.isOpen = !state.isOpen;
    },
    openSidebar: (state) => {
      state.isOpen = true;
    },
    closeSidebar: (state) => {
      state.isOpen = false;
    },
    toggleUsertype: (state) => {
      state.userType = "";
    },
    setUserType: (state, action) => {
      state.userType = action.payload;
    },
    setUsername: (state, action) => {
      state.dataUser = action.payload;
    },
    setCategory: (state, action) => {
      state.userCategory = action.payload;
    }
  },
});

export const { toggleIsLogging, setIsLogging, toggleSidebar, openSidebar, closeSidebar, toggleUsertype, setUserType, setUsername, setCategory } = sidebarSlice.actions;

export default sidebarSlice.reducer;
