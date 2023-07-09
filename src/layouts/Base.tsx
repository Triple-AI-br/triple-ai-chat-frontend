import {
    Box,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@mui/material";
import {
    Inbox as InboxIcon,
    DocumentScanner as DocumentScannerIcon,
    SupervisorAccount as SupervisorAccountIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { routesManager } from "../routes/routesManager";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useAppDispatch } from "../redux/hooks";
import { actionLogout } from "../redux/authenticationSlice";

interface IBaseProps {
    children: JSX.Element;
    title: string;
}

const Base = ({ children, title }: IBaseProps) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = () => dispatch(actionLogout());

    return (
        <Box display="flex" height="100vh" width="100%">
            <Box
                pt={2}
                sx={{
                    backgroundColor: "#fafafa",
                    borderRight: "1px solid #bbb",
                }}
                display="flex"
                flexDirection="column"
                alignItems="center"
            >
                <img
                    src={`${process.env.REACT_APP_BASE_FRONT_URL}/triple-ai.png`}
                    style={{ maxWidth: "120px", marginRight: 50 }}
                />
                <Box width="100%" mt={2} mb={1}>
                    <Divider />
                </Box>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton
                            sx={{ pl: 5, pr: 10 }}
                            onClick={() =>
                                navigate(routesManager.getChatsRoute())
                            }
                        >
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Chats" />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton
                            sx={{ pl: 5, pr: 10 }}
                            onClick={() =>
                                navigate(routesManager.getSourcesRoute())
                            }
                        >
                            <ListItemIcon>
                                <DocumentScannerIcon />
                            </ListItemIcon>
                            <ListItemText primary="Sources" />
                        </ListItemButton>
                    </ListItem>

                    {/* <ListItem disablePadding>
                        <ListItemButton sx={{ pl: 5, pr: 10 }}>
                            <ListItemIcon>
                                <SupervisorAccountIcon />
                            </ListItemIcon>
                            <ListItemText primary="Admin" />
                        </ListItemButton>
                    </ListItem> */}

                    <ListItem disablePadding onClick={handleLogout}>
                        <ListItemButton sx={{ pl: 5, pr: 10 }}>
                            <ListItemIcon>
                                <LogoutOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>

            <Box
                flex={1}
                display="flex"
                flexDirection="column"
                sx={{ backgroundColor: "rgba(111, 107, 125, .09)" }}
                px={3}
                py={4}
                gap={3}
            >
                <Box
                    mr={20}
                    p={3}
                    pl={5}
                    sx={{
                        backgroundColor: "#fff",
                        borderRadius: 10,
                        // h-offset v-offset blur spread color
                        boxShadow: "3px 3px 15px 0px #ccc",
                    }}
                >
                    <Typography color="#777" component="h1" variant="h6">
                        {title}
                    </Typography>
                </Box>
                {children}
            </Box>
        </Box>
    );
};

export { Base };
