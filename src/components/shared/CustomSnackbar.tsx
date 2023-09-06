import { Alert, Snackbar, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  actionDismissNotification,
  selectIsNotificationOpen,
  selectNotification,
} from "../../redux/notificationSlice";

const CustomSnackbar = () => {
  const dispatch = useAppDispatch();
  const notification = useAppSelector(selectNotification);
  const isOpen = useAppSelector(selectIsNotificationOpen);

  if (!notification) return null;

  const handleClose = (_?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return;
    dispatch(actionDismissNotification());
  };

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={notification.autoHideDuration}
      onClose={handleClose}
      anchorOrigin={notification.anchorOrigin}
    >
      <Alert
        variant={notification.variant}
        onClose={handleClose}
        severity={notification.severity}
        sx={{ width: "100%" }}
      >
        {notification.messages.map(msg => (
          <Typography
            color={
              notification.variant === "filled"
                ? "#fff"
                : undefined
            }
            key={msg}
          >
            {msg}
          </Typography>
        ))}
      </Alert>
    </Snackbar>
  );
};

export { CustomSnackbar };
