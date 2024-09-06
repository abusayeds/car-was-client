import { createSlice } from "@reduxjs/toolkit";

interface BookingState {
  slotId: string;
  date: string;
  startTime :string
  endTime : string
  service : string
}

const initialState: BookingState = {
  slotId: "",
  date: "",
  startTime : '',
  endTime  : '',
  service : ''
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    booking: (_state, action) => {
      return action.payload;
    },
  },
});

export const { booking } = bookingSlice.actions;
export default bookingSlice.reducer;
