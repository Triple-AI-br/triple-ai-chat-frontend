import { CredentialResponse, GoogleLogin as _GoogleLogin } from "@react-oauth/google";
import { useAppDispatch } from "../../../redux/hooks";
import { actionDisplayNotification } from "../../../redux/notificationSlice";
import { authService } from "../../../services";
import { actionLoginWithGoogle } from "../../../redux/authenticationSlice";
import axios, { AxiosError } from "axios";
const GoogleLogin = () => {
  const dispatch = useAppDispatch();

  const handleLoginSuccess = async (response: CredentialResponse) => {
    try {
      const data = await authService.signUpOrInWithGoogle(response);
      dispatch(actionLoginWithGoogle(data));
    } catch (err) {
      const errorMessages = ["Failed to authenticate with Google"];
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError;
        if (
          axiosError.response &&
          axiosError.response.data &&
          (axiosError.response.data as { detail?: string }).detail
        ) {
          const errorMsg = (axiosError.response.data as { detail: string }).detail;
          errorMessages.push(errorMsg);
        }
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
