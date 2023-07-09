import { Box } from "@mui/material";
import { Base } from "../layouts/Base";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { ChatInfo } from "../components/Chats";
import { routesManager } from "../routes/routesManager";

const ChatsPage = () => {
    return (
        <Base title={"Your AI Chatbots"}>
            <Box
                flex={1}
                px={3}
                py={4}
                display="flex"
                flexDirection="column"
                gap={5}
            >
                <Grid container width="100%" spacing={2}>
                    <ChatInfo
                        onClick={() =>
                            window.open(
                                `${
                                    process.env.REACT_APP_BASE_FRONT_URL
                                }${routesManager.getChatRoute()}`,
                                "_blank",
                                "noreferrer"
                            )
                        }
                        title="Timenow AI"
                        description="Base Externa e Interna de conhecimentos"
                    />
                </Grid>
            </Box>
        </Base>
    );
};

export { ChatsPage };
