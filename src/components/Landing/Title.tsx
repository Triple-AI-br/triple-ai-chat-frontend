import { useTheme, Typography, useMediaQuery, Box } from "@mui/material";

function Title() {
    const theme = useTheme();
    const isScreenXs = useMediaQuery(theme.breakpoints.only("xs"));
    const isScreenSm = useMediaQuery(theme.breakpoints.only("sm"));
    return (
        <Typography
            align="center"
            component="h1"
            variant={isScreenXs ? "h4" : isScreenSm ? "h3" : "h2"}
            fontFamily="Inter"
            fontWeight={500}
            sx={{
                background:
                    "linear-gradient(45deg, rgba(10,10,10,0.7) 0%, #777 67%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
            }}
        >
            A AI que gerencia todo
            <Box
                color="#FF9029"
                sx={{
                    background: "#FF9029",
                    WebkitBackgroundClip: "text",
                }}
                display="inline"
            >
                {" "}
                conhecimento interno{" "}
            </Box>
            da sua empresa
        </Typography>
    );
}

export { Title };
