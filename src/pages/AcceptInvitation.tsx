import { Box, Button, TextField } from "@mui/material";
import { Base } from "../layouts/Base";
import { Formik } from "formik";
import { useAppDispatch } from "../redux/hooks";
import { actionAcceptInvite } from "../redux/authenticationSlice";
import * as yup from "yup";
import { useNavigate, useSearchParams } from "react-router-dom";
import { routesManager } from "../routes/routesManager";
import { actionDisplayNotification } from "../redux/notificationSlice";

interface IFormData {
    password: string;
    confirmPassword: string;
}

const AcceptInvitationPage = () => {
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token") as string;
    const navigate = useNavigate();

    const FormValidationSchema: yup.Schema<IFormData> = yup.object().shape({
        password: yup.string().required(),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref("password")], "Passwords do not match")
            .required("This field is required"),
    });

    return (
        <Base title="Set new password">
            <Box mx="auto" width="50%">
                <Formik
                    initialValues={{ password: "", confirmPassword: "" }}
                    onSubmit={async (values, { setSubmitting }) => {
                        const bearerToken = await dispatch(
                            actionAcceptInvite({ ...values, token })
                        );
                        setSubmitting(false);
                        if (
                            bearerToken.payload &&
                            "access_token" in
                                (bearerToken.payload as Record<string, string>)
                        ) {
                            dispatch(
                                actionDisplayNotification({
                                    messages: ["User successfuly registered"],
                                    anchorOrigin: {
                                        horizontal: "center",
                                        vertical: "top",
                                    },
                                    variant: "filled",
                                    severity: "success",
                                })
                            );
                            navigate(routesManager.getChatsRoute());
                        } else {
                            dispatch(
                                actionDisplayNotification({
                                    messages: ["Unable to register user"],
                                    anchorOrigin: {
                                        horizontal: "center",
                                        vertical: "top",
                                    },
                                    variant: "filled",
                                    severity: "error",
                                })
                            );
                        }
                    }}
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
                            <TextField
                                id="password"
                                label={
                                    errors.password && touched.password
                                        ? errors.password
                                        : "Password"
                                }
                                fullWidth
                                variant="filled"
                                name="password"
                                type="password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(
                                    errors.password && touched.password
                                )}
                            />
                            <TextField
                                id="confirmPassword"
                                label={
                                    errors.confirmPassword &&
                                    touched.confirmPassword
                                        ? errors.confirmPassword
                                        : "Confirm password"
                                }
                                fullWidth
                                variant="filled"
                                name="confirmPassword"
                                type="password"
                                value={values.confirmPassword}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(
                                    errors.confirmPassword &&
                                        touched.confirmPassword
                                )}
                            />

                            <Button
                                onClick={() => handleSubmit()}
                                variant="contained"
                                disabled={isSubmitting}
                            >
                                Set Password
                            </Button>
                        </Box>
                    )}
                </Formik>
            </Box>
        </Base>
    );
};
export { AcceptInvitationPage };
