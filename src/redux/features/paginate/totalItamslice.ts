import { createSlice } from "@reduxjs/toolkit";

const totalitemSlice = createSlice({
  name: "page",
  initialState: {
    totalItem: "",
  },
  reducers: {
    setItem: (state, action) => {
      state.totalItem = action.payload;
    },
  },
});

export const { setItem } = totalitemSlice.actions;

export default totalitemSlice.reducer;
