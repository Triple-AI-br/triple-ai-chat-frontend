import { Avatar, Box, Button, Typography } from "@mui/material";
import { LibraryAdd as AddIcon } from "@mui/icons-material";
import { ICustomerData } from "../../redux/authenticationSlice";

// Will this trigger vercel deployment?
interface ILeftTopBarProps {
    handleNewChat(): void;
    customerData?: ICustomerData;
}
const LeftTopBar = ({ handleNewChat, customerData }: ILeftTopBarProps) => {
	const backgroundColor = customerData?.main_color;
	const textColor =
        backgroundColor?.toLowerCase() === "#fff" ? "#777" : "#fff";

	return (
		<Box
			display="flex"
			py={2}
			alignItems="center"
			gap={1}
			sx={{ backgroundColor, borderBottom: "1px solid #aaa" }}
			px={2}
		>
			<Avatar
				src={customerData?.logo_url}
				sx={{ width: 80, height: 80 }}
			/>
			<Typography
				color={textColor}
				fontWeight={600}
				fontSize={18}
				sx={{ mr: 5 }}
			>
                Your conversations
			</Typography>
			<Button
				onClick={handleNewChat}
				size="small"
				variant="outlined"
				startIcon={<AddIcon />}
				sx={{
					ml: "auto",
					color: textColor,
					borderColor: textColor,
					":hover": { borderColor: "#ccc", color: "#ccc" },
				}}
			>
                New
			</Button>
		</Box>
	);
};

export { LeftTopBar };
