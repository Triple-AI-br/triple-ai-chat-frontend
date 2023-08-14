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
            gap={2}
            sx={{ backgroundColor: customerData?.main_color }}
        >
            <Avatar
                src={customerData?.logo_url}
                sx={{ width: 80, height: 80 }}
            />
            <Typography color="#fff" fontWeight={600} fontSize={18}>
                Your conversations
            </Typography>
            <Box mx={1.5} />
            <Button
                onClick={handleNewChat}
                size="small"
                variant="outlined"
                startIcon={<AddIcon />}
                sx={{
                    ml: "auto",
                    mr: 2,
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
