import { Avatar, Box, Button, Typography } from "@mui/material";
import { LibraryAdd as AddIcon } from "@mui/icons-material";
import { ICustomerData } from "../../redux/authenticationSlice";

interface ILeftTopBarProps {
    handleNewChat(): void;
    customerData?: ICustomerData;
}
const LeftTopBar = ({ handleNewChat, customerData }: ILeftTopBarProps) => {
    return (
        <Box
            display="flex"
            py={1}
            alignItems="center"
            gap={1}
            sx={{ backgroundColor: customerData?.main_color }}
            px={2}
        >
            <Avatar
                src={customerData?.logo_url}
                sx={{ width: 80, height: 80 }}
            />
            <Typography
                color="#fff"
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
                    color: "#fff",
                    borderColor: "#fff",
                    ":hover": { borderColor: "#ccc", color: "#ccc" },
                }}
            >
                New
            </Button>
        </Box>
    );
};

export { LeftTopBar };
