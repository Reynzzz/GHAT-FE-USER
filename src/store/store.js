// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
} from "redux";
import { thunk } from "redux-thunk";
import sidebarReducer from "./sidebarSlice";
import userReducer from "./userSlice";
import teacherReducer from "./Reduces/teacherReduces";
import scheduleReducer from "./Reduces/scheduleReduces";
import kelasReducer from "./Reduces/kelasReduces";
import userScheduleReduces from "./Reduces/userScheduleReduces";
import validasiUserSchedule from "./Reduces/validasiUserSchedule";

// Menggabungkan semua reducer
const rootReducer = combineReducers({
  sidebar: sidebarReducer,
  userType: userReducer,
  Teacher: teacherReducer,
  schedules : scheduleReducer,
  Kelases : kelasReducer,
  userSchedules: userScheduleReduces,
  validasiUsers : validasiUserSchedule
});

// Konfigurasi store menggunakan configureStore dari Redux Toolkit
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk),
});

export default store;
