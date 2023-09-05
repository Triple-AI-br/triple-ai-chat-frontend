import { Box, Button, useMediaQuery, useTheme } from "@mui/material";
import { LoginForm, RequestPasswordResetForm } from "../components/Auth";
import { CustomSnackbar } from "../components/shared";
import { useState } from "react";

const LoginPage = () => {
	const theme = useTheme();
	const isScreenXs = useMediaQuery(theme.breakpoints.only("xs"));
	const isScreenSm = useMediaQuery(theme.breakpoints.only("sm"));
	const [resetPassword, setResetPassword] = useState<boolean>(false);
	return (
		<Box display="flex" alignItems="center" height="100vh">
			<CustomSnackbar />
			<Box sx={{ display: { xs: "none", md: "flex" } }}>
				<img
					src={`${process.env.REACT_APP_BASE_FRONT_URL}/login.jpg`}
					style={{
						margin: "auto auto",
						maxWidth: "70%",
					}}
				/>
			</Box>
			<Box
				display="flex"
				flexDirection="column"
				gap={6}
				flex={1}
				paddingX={8}
				sx={{
					backgroundColor: "#f9f9ff",
					boxShadow: "0px 0px 20px 0px #bbb",
				}}
				minWidth={isScreenXs ? "80%" : isScreenSm ? "80%" : "40%"}
				height="100%"
				alignItems="center"
				justifyContent="center"
			>
				{resetPassword ? (
					<RequestPasswordResetForm
						callback={() => setResetPassword(false)}
					/>
				) : (
					<LoginForm />
				)}
				{resetPassword ? (
					<Button onClick={() => setResetPassword(false)}>
                        I already have an account.
					</Button>
				) : (
					<Button onClick={() => setResetPassword(true)}>
                        Forgot your password?
					</Button>
				)}
			</Box>
		</Box>
	);
};

export { LoginPage };
