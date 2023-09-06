import { AlertColor, SnackbarOrigin, AlertProps } from "@mui/material";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface INotification {
    messages: string[];
    autoHideDuration?: number;
    severity?: AlertColor;
    anchorOrigin?: SnackbarOrigin;
    variant?: AlertProps["variant"];
}

interface INotificationState {
    notification?: INotification;
    isOpen: boolean;
}

const initialState: INotificationState = { isOpen: false };

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    displayNotification(state, action: PayloadAction<INotification>) {
      const notification = action.payload;
      notification.variant ||= "filled";
      notification.severity ||= "error";
      notification.autoHideDuration ||= 4000;
      notification.anchorOrigin ||= {
        vertical: "top",
        horizontal: "center",
      };
      state.notification = notification;
      state.isOpen = true;
    },
    dismissNotification(state) {
      state.isOpen = false;
    },
  },
});

export const selectNotification = (state: RootState) =>
  state.notification.notification;
export const selectIsNotificationOpen = (state: RootState) =>
  state.notification.isOpen;
export const {
  dismissNotification: actionDismissNotification,
  displayNotification: actionDisplayNotification,
} = notificationSlice.actions;
export const notificationSliceReducer = notificationSlice.reducer;
