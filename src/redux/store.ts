import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import loginReducer from "./features/authantication/AuthenticationSlice";
import bookigReducer from "./features/booking/bookingSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "auth",
  storage,
};
const persistedAuthReducer = persistReducer(persistConfig, loginReducer);
export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    UserDetails: persistedAuthReducer,
    booking: bookigReducer,
  },
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
