import { configureStore } from "@reduxjs/toolkit";
import appStoreReducer from './appStoreSlice.js';

export default configureStore({
  reducer: {
    appStore: appStoreReducer
  },
});