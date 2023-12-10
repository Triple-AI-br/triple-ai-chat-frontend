import { CredentialResponse, GoogleLogin as _GoogleLogin } from "@react-oauth/google";
import { useAppDispatch } from "../../../redux/hooks";
import { actionDisplayNotification } from "../../../redux/notificationSlice";
import { authService } from "../../../services";
import { actionLoginWithGoogle } from "../../../redux/authenticationSlice";

const GoogleLogin = () => {
  const dispatch = useAppDispatch();

  const handleLoginSuccess = async (response: CredentialResponse) => {
    const data = await authService.signUpOrInWithGoogle(response);
    dispatch(actionLoginWithGoogle(data));
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
