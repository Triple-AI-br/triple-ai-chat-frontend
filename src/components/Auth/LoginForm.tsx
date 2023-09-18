import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { routesManager } from "../../routes/routesManager";
import { actionDisplayNotification } from "../../redux/notificationSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { actionLogin, selectError, selectIsAuthenticated } from "../../redux/authenticationSlice";
import { useEffect, useRef } from "react";

interface IFormData {
  email: string;
  password: string;
}

const FormValidationSchema: yup.Schema<IFormData> = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const error = useAppSelector(selectError);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const handleSubmitRef = useRef<
    ((e?: React.FormEvent<HTMLFormElement> | undefined) => void) | undefined
  >();

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Enter" && handleSubmitRef.current) {
        handleSubmitRef.current();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []); // Empty dependency array ensures this runs once on mount and cleanup on unmount

  useEffect(() => {
    if (isAuthenticated) {
      const next =
        location.state && location.state.next
          ? location.state.next
          : routesManager.getProjectsRoute();
      navigate(next);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (error) {
      dispatch(
        actionDisplayNotification({
          messages: [error],
        }),
      );
    }
  }, [error]);

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validate={async (values) => {
        const errors: Record<string, string> = {};
        try {
          await FormValidationSchema.validate(values, {
            abortEarly: false,
          });
        } catch (err) {
          (err as yup.ValidationError).inner.forEach((item) => {
            if (!item.path) return;
            errors[item.path] = item.message;
          });
        }
        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        await dispatch(actionLogin(values));
        setSubmitting(false);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* There are other functionalities available as well */
      }) => {
        handleSubmitRef.current = handleSubmit;
        return (
          <Box width="100%" display="flex" flexDirection="column" gap={5} alignItems="center">
            <Box maxWidth="200px" mb={2}>
              <img
                src={`${process.env.REACT_APP_BASE_FRONT_URL}/triple-ai.png`}
                style={{
                  maxWidth: "100%",
                }}
              />
            </Box>

            <Box display="flex" justifyContent="start" mr="auto" alignItems="end">
              <Typography fontSize={18} fontWeight={600} color="#444">
                Login&nbsp;
              </Typography>
              <Typography fontSize={15} fontWeight={500} color="#777">
                (invitation only)
              </Typography>
            </Box>
            <TextField
              id="email"
              label={errors.email && touched.email ? errors.email : "Email"}
              fullWidth
              variant="filled"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(errors.email && touched.email)}
            />
            <TextField
              id="password"
              label={errors.password && touched.password ? errors.password : "Password"}
              fullWidth
              variant="filled"
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(errors.password && touched.password)}
            />
            <Button onClick={() => handleSubmit()} variant="contained" disabled={isSubmitting}>
              Log In
            </Button>
          </Box>
        );
      }}
    </Formik>
  );
};

export { LoginForm };
