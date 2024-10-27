// footerSlice.js
import { createSlice } from "@reduxjs/toolkit";

const footerSlice = createSlice({
  name: "footer",
  initialState: {
    isActive: false,
  },
  reducers: {
    setFooterActive: (state, action) => {
      state.isActive = action.payload;
      localStorage.setItem("footer|Active", action.payload);
    },
  },
});

export const { setFooterActive } = footerSlice.actions;

export default footerSlice.reducer;
