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
    SupervisorAccount as SupervisorAccountIcon,
    PostAdd as PostAddIcon,
    Engineering as EngineeringIcon,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { routesManager } from "../routes/routesManager";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
    ICustomerData,
    actionLogout,
    selectCustomerData,
    selectIsAdminOrSuperUser,
    selectIsSuperUser as selectIsSuperuser,
} from "../redux/authenticationSlice";
import { CustomSnackbar } from "../components/shared";

interface IBaseProps {
    children: JSX.Element;
    title: string;
}

const Base = ({ children, title }: IBaseProps) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isAdminOrSuperUser = useAppSelector(selectIsAdminOrSuperUser);
    const { pathname } = useLocation();
    const customerData: ICustomerData | undefined =
        useAppSelector(selectCustomerData);
    const isSuperuser = useAppSelector(selectIsSuperuser);

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
                    <ListItem
                        disablePadding
                        sx={{
                            backgroundColor:
                                pathname === routesManager.getProjectsRoute()
                                    ? "#eee"
                                    : undefined,
                        }}
                    >
                        <ListItemButton
                            sx={{ pl: 5, pr: 10 }}
                            onClick={() => {
                                navigate(routesManager.getProjectsRoute());
                            }}
                        >
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Chats" />
                        </ListItemButton>
                    </ListItem>

                    {isAdminOrSuperUser && (
                        <ListItem
                            disablePadding
                            sx={{
                                backgroundColor:
                                    pathname === routesManager.getAdminRoute()
                                        ? "#eee"
                                        : undefined,
                            }}
                        >
                            <ListItemButton
                                sx={{ pl: 5, pr: 10 }}
                                onClick={() => {
                                    navigate(routesManager.getAdminRoute());
                                }}
                            >
                                <ListItemIcon>
                                    <SupervisorAccountIcon />
                                </ListItemIcon>
                                <ListItemText primary="Admin" />
                            </ListItemButton>
                        </ListItem>
                    )}
                    <ListItem
                        disablePadding
                        sx={{
                            backgroundColor:
                                pathname === routesManager.getPromptsRoute()
                                    ? "#eee"
                                    : undefined,
                        }}
                    >
                        <ListItemButton
                            sx={{ pl: 5, pr: 10 }}
                            onClick={() => {
                                navigate(routesManager.getPromptsRoute());
                            }}
                        >
                            <ListItemIcon>
                                <PostAddIcon />
                            </ListItemIcon>
                            <ListItemText primary="Prompts" />
                        </ListItemButton>
                    </ListItem>

                    {isSuperuser && (
                        <ListItem
                            disablePadding
                            sx={{
                                backgroundColor:
                                    pathname ===
                                    routesManager.getSuperuserRoute()
                                        ? "#eee"
                                        : undefined,
                            }}
                        >
                            <ListItemButton
                                sx={{ pl: 5, pr: 10 }}
                                onClick={() => {
                                    navigate(routesManager.getSuperuserRoute());
                                }}
                            >
                                <ListItemIcon>
                                    <EngineeringIcon />
                                </ListItemIcon>
                                <ListItemText primary="Super User" />
                            </ListItemButton>
                        </ListItem>
                    )}
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

            <Box
                flex={1}
                sx={{
                    backgroundColor: "rgba(111, 107, 125, .09)",
                    overflowY: "scroll",
                }}
            >
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
                        {isSuperuser
                            ? `${title} - ${customerData?.name}`
                            : title}
                    </Typography>
                </Box>
                <Box px={3} py={4} display="flex" flexDirection="column">
                    {children}
                </Box>
            </Box>
        </Box>
    );
};

export { Base };
