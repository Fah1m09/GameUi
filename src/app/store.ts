import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/Auth/authSlice";
import gameReducer from "./features/Game/gameSlice";
import loaderReducer from "./features/Loader/loaderSlice";

const store = configureStore({
  reducer: {
    loader: loaderReducer,
    auth: authReducer,
    game: gameReducer,
  },
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
