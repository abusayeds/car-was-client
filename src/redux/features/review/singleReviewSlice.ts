import { createSlice } from "@reduxjs/toolkit";

const reviewSlice = createSlice({
  name: "Review",
  initialState: {
    reviewId: "",
  },
  reducers: {
    setSingleRreviewId: (state, action) => {
      state.reviewId = action.payload;
    },
  },
});

export const { setSingleRreviewId } = reviewSlice.actions;

export default reviewSlice.reducer;
