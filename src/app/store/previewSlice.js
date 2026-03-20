import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPreview: {
    enable: false,
    msg: [],
    value: "",
    resolve: null,
  },
};

const previewSlice = createSlice({
  name: "preview",
  initialState,
  reducers: {
    setIsPreview: (state, action) => {
      state.isPreview = action.payload;
    },
  },
});

export const { setIsPreview } = previewSlice.actions;
export default previewSlice.reducer;