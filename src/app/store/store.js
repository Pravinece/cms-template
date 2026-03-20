import { configureStore } from "@reduxjs/toolkit";
import previewReducer from "./previewSlice.js";
import holdReducer from "./holdSlice";

export const store = configureStore({
    
  reducer: {
    preview: previewReducer,
    hold: holdReducer,
  },

});