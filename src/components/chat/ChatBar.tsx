import { Box, Typography } from "@mui/material";

const ChatBar = () => {
    return (
        <Box
            px={3}
            py={2}
            sx={{ backgroundColor: "#fff" }}
            borderBottom="1px solid #ddd"
        >
            <Typography color="#777">Chat</Typography>
        </Box>
    );
};
export { ChatBar };
