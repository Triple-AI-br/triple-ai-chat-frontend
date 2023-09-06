import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useAppDispatch } from "../../redux/hooks";
import { authService } from "../../services";
import { actionDisplayNotification } from "../../redux/notificationSlice";

interface IFormData {
    email: string;
}

const FormValidationSchema: yup.Schema<IFormData> = yup.object().shape({
  email: yup.string().email().required(),
});

const RequestPasswordResetForm = ({ callback }: { callback(): void }) => {
  const dispatch = useAppDispatch();

  return (
    <Formik
      initialValues={{ email: "" }}
      validate={async values => {
        const errors: Record<string, string> = {};
        try {
          await FormValidationSchema.validate(values, {
            abortEarly: false,
          });
        } catch (err) {
          (err as yup.ValidationError).inner.forEach(item => {
            if (!item.path) return;
            errors[item.path] = item.message;
          });
        }
        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const { detail: msg } =
                        await authService.requestPasswordReset(values.email);
          dispatch(
            actionDisplayNotification({
              messages: [msg],
              severity: "success",
            })
          );
          callback();
        } catch (error) {
          dispatch(
            actionDisplayNotification({
              messages: ["Error requesting password reset"],
            })
          );
        }
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
      }) => (
        <Box
          width="100%"
          display="flex"
          flexDirection="column"
          gap={5}
          alignItems="center"
        >
          <Box maxWidth="200px" mb={2}>
            <img
              src={`${process.env.REACT_APP_BASE_FRONT_URL}/triple-ai.png`}
              style={{
                maxWidth: "100%",
              }}
            />
          </Box>

          <Box
            display="flex"
            justifyContent="start"
            mr="auto"
            alignItems="end"
          >
            <Typography fontSize={18} fontWeight={600} color="#444">
                            Request password reset
            </Typography>
          </Box>
          <TextField
            id="email"
            label={
              errors.email && touched.email
                ? errors.email
                : "Email"
            }
            fullWidth
            variant="filled"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(errors.email && touched.email)}
          />
          <Button
            onClick={() => handleSubmit()}
            variant="contained"
            disabled={isSubmitting}
          >
                        Request password reset
          </Button>
        </Box>
      )}
    </Formik>
  );
};

export { RequestPasswordResetForm };
