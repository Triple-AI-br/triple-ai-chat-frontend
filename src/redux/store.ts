import { configureStore } from "@reduxjs/toolkit";
import { notificationSliceReducer } from "./notificationSlice";
import { authSliceReducer } from "./authenticationSlice";

const store = configureStore({
	reducer: {
		notification: notificationSliceReducer,
		auth: authSliceReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { store };
