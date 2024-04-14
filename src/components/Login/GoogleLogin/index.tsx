import { CredentialResponse, GoogleLogin as _GoogleLogin } from "@react-oauth/google";
import { useAppDispatch } from "../../../redux/hooks";
import { actionDisplayNotification } from "../../../redux/notificationSlice";
import { authService } from "../../../services";
import { actionLoginWithGoogle } from "../../../redux/authenticationSlice";
import axios from "axios";
const GoogleLogin = () => {
  const dispatch = useAppDispatch();

  const handleLoginSuccess = async (response: CredentialResponse) => {
    try {
      const data = await authService.signUpOrInWithGoogle(response);
      dispatch(actionLoginWithGoogle(data));
    } catch (err) {
      const errorMessages = ["Failed to authenticate with Google"];
      if (axios.isAxiosError(err) && err.response?.data) {
        const detail = (err.response.data as { detail?: string }).detail;
        if (detail) errorMessages.push(detail);
      }
      dispatch(
        actionDisplayNotification({
          messages: errorMessages,
          severity: "error",
        }),
      );
    }
  };

  const onError = () => {
    dispatch(
      actionDisplayNotification({
        messages: ["Failed to authenticate with Google"],
        severity: "error",
      }),
    );
  };
  return (
    <_GoogleLogin
      useOneTap
      size="large"
      shape="pill"
      onSuccess={handleLoginSuccess}
      onError={onError}
    />
  );
};

export { GoogleLogin };
