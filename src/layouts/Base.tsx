import {
    Box,
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
import { CustomSnackbar } from "../components/shared";

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
            <CustomSnackbar />
            <Box
                sx={{
                    backgroundColor: "#fff",
                    borderRight: "1px solid #ccc",
                }}
                display="flex"
                flexDirection="column"
                alignItems="center"
                overflow="hidden"
            >
                <Box
                    p={2}
                    display="flex"
                    width="100%"
                    justifyContent="center"
                    sx={{ borderBottom: "1px solid #ccc" }}
                    height="80px"
                >
                    <img
                        src={`${process.env.REACT_APP_BASE_FRONT_URL}/triple-ai.png`}
                        style={{ height: "50px", marginRight: 50 }}
                    />
                </Box>

                <List>
                    <ListItem disablePadding>
                        <ListItemButton
                            sx={{ pl: 5, pr: 10 }}
                            onClick={() =>
                                navigate(routesManager.getProjectsRoute())
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
                        <ListItemButton
                            sx={{ pl: 5, pr: 10 }}
                            onClick={() =>
                                navigate(routesManager.getAdminRoute())
                            }
                        >
                            <ListItemIcon>
                                <SupervisorAccountIcon />
                            </ListItemIcon>
                            <ListItemText primary="Admin" />
                        </ListItemButton>
                    </ListItem> */}
                </List>
                <Box sx={{ height: "100%" }} />

                <List>
                    <ListItem
                        disablePadding
                        onClick={handleLogout}
                        sx={{
                            color: "rgb(247, 62, 62)",
                            ":hover": {
                                backgroundColor: "rgb(255, 215, 215)",
                            },
                        }}
                    >
                        <ListItemButton sx={{ pl: 5, pr: 10 }}>
                            <ListItemIcon>
                                <LogoutOutlinedIcon
                                    sx={{
                                        color: "rgb(247, 62, 62)",
                                    }}
                                />
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>

            <Box flex={1} sx={{ backgroundColor: "rgba(111, 107, 125, .09)" }}>
                <Box
                    px={4}
                    sx={{
                        height: "83px",
                        backgroundColor: "#fff",
                        borderBottom: "1px solid #ccc",
                    }}
                    display="flex"
                >
                    <Typography
                        color="#555"
                        component="h1"
                        variant="h4"
                        sx={{ my: "auto" }}
                    >
                        {title}
                    </Typography>
                </Box>
                <Box
                    px={3}
                    py={4}
                    display="flex"
                    flexDirection="column"
                    maxHeight="80%"
                    sx={{
                        overflowY: "scroll",
                    }}
                >
                    {children}
                </Box>
            </Box>
        </Box>
    );
};

export { Base };
