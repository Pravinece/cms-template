import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedData: {},
};

const holdSlice = createSlice({
  name: "hold",
  initialState,
  reducers: {
    setSelectedData: (state, action) => {
      const { type, data } = action.payload;

      state.selectedData[type] = data;
    },

    setClean: (state, action) => {
      state.selectedData = action.payload;
    },
  },
});

export const { setSelectedData, setClean } = holdSlice.actions;

export default holdSlice.reducer;