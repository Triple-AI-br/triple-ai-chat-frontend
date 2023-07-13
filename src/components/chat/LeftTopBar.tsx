import { Avatar, Box, Button, Typography } from "@mui/material";
import { LibraryAdd as AddIcon } from "@mui/icons-material";

const COMPANY_COLOR = "#376458";

interface ILeftTopBarProps {
    handleNewChat(): void;
}
const LeftTopBar = ({ handleNewChat }: ILeftTopBarProps) => {
    return (
        <Box
            display="flex"
            py={1}
            px="auto"
            alignItems="center"
            justifyContent="space-evenly"
            sx={{ backgroundColor: COMPANY_COLOR }}
        >
            <Avatar
                src="https://timenow.com.br/wp-content/uploads/2023/03/timenow-destaque-1.png"
                alt="Timenow logo"
                sx={{ width: 80, height: 80 }}
            />
            <Typography color="#fff" fontWeight={600} fontSize={18}>
                Timenow AI Chatbot
            </Typography>
            <Box mx={1.5} />
            <Button
                onClick={handleNewChat}
                size="small"
                variant="outlined"
                startIcon={<AddIcon />}
                sx={{
                    mr: 2,
                    color: "#fff",
                    borderColor: "#fff",
                    ":hover": { borderColor: "#ccc", color: "#ccc" },
                }}
            >
                New chat
            </Button>
        </Box>
    );
};

export { LeftTopBar };
