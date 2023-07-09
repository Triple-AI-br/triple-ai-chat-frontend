import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import { useNavigate } from "react-router-dom";
import { routesManager } from "../../routes/routesManager";

const pages: string[] = [];

function CustomAppBar() {
    const navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
        null
    );

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar
            position="static"
            sx={{
                backgroundColor: "#fff",
                boxShadow: "0px 0px 1px 1px rgba(0,0,0,0.12)",
            }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <img
                        src={`${process.env.REACT_APP_BASE_FRONT_URL}/triple-ai.png`}
                        style={{ maxHeight: "50px" }}
                    />

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            {pages.map(page => (
                                <MenuItem
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                >
                                    <Typography textAlign="center">
                                        {page}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <AdbIcon
                        sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
                    />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: "flex", md: "none" },
                            flexGrow: 1,
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        LOGO
                    </Typography>
                    <Box ml="auto" sx={{ display: { xs: "none", md: "flex" } }}>
                        {pages.map(page => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{
                                    mx: 2,
                                    my: 2,
                                    color: "#777",
                                    display: "block",
                                }}
                            >
                                {page}
                            </Button>
                        ))}
                        <Button
                            onClick={() =>
                                navigate(routesManager.getChatsRoute())
                            }
                            endIcon={<LoginOutlinedIcon />}
                            variant="contained"
                            sx={{
                                backgroundColor: "#EF8019",
                                ":hover": { backgroundColor: "#FF9029" },
                                borderRadius: 10,
                                px: 4,
                                py: 1.2,
                                boxShadow: "2px 2px 7px 0px #aaa",
                            }}
                        >
                            Entrar
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export { CustomAppBar };
