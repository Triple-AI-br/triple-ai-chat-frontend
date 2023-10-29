import { configureStore } from "@reduxjs/toolkit";
import { notificationSliceReducer } from "./notificationSlice";
import { authSliceReducer } from "./authenticationSlice";
import { contractSliceReducer } from "./contractSlice";

const store = configureStore({
  reducer: {
    notification: notificationSliceReducer,
    auth: authSliceReducer,
    contract: contractSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { store };
