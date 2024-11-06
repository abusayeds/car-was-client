/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export type TUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
  user?: any;
};
type TAuthState = {
  user: null | TUser;
  token: null | string;
};

const initialState: TAuthState = {
  user: null,
  token: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});
export const { setUser, logOut } = loginSlice.actions;
export default loginSlice.reducer;
export const selectCurrentToken = (state: RootState) => state.UserDetails.token;
export const selectCurrentUser = (state: RootState) => state.UserDetails.user;
