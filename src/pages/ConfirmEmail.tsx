import { Box, Typography } from "@mui/material";
import { Base } from "../layouts/Base";
import { useEffect, useState } from "react";
import { authService } from "../services";
import { Spinner } from "../components/loaders";
import { useSearchParams } from "react-router-dom";

const ConfirmEmailPage = () => {
	const [response, setResponse] = useState<boolean>();
	const [isLoading, setIsLoading] = useState(true);
	const [searchParams] = useSearchParams();
	const token = searchParams.get("token");

	if (!token) {
		return (
			<Base title="Email confirmation">
				<Box mx="auto">
					<Typography fontSize={20} fontWeight={600} color="error">
                        Missing token!
					</Typography>
				</Box>
			</Base>
		);
	}

	useEffect(() => {
		(async () => {
			const res = await authService.confirmEmail(token);
			setResponse(res.success);
			setIsLoading(false);
		})();
	}, []);

	let content;

	if (isLoading) {
		content = <Spinner />;
	} else if (response) {
		content = (
			<Typography fontSize={20} fontWeight={600} color="#309f30">
                Successfully confirmed email!
			</Typography>
		);
	} else {
		content = (
			<Typography fontSize={20} fontWeight={600} color="error">
                Failed to confirm email!
			</Typography>
		);
	}

	return (
		<Base title="Email confirmation">
			<Box mx="auto"> {content} </Box>
		</Base>
	);
};

export { ConfirmEmailPage };
