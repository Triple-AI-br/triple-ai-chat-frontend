import { Box, useMediaQuery, useTheme } from "@mui/material";

function MainImage() {
    const theme = useTheme();
    const isScreenXs = useMediaQuery(theme.breakpoints.only("xs"));
    const isScreenSm = useMediaQuery(theme.breakpoints.only("sm"));
    const isScreenMd = useMediaQuery(theme.breakpoints.only("md"));

    let imageMaxWidth: number;
    if (isScreenXs) imageMaxWidth = 250;
    else if (isScreenSm) imageMaxWidth = 300;
    else if (isScreenMd) imageMaxWidth = 350;
    else imageMaxWidth = 450;

    return (
        <Box maxWidth={`${imageMaxWidth}px`}>
            <img
                src={`${process.env.REACT_APP_BASE_FRONT_URL}/landing.jpg`}
                style={{
                    maxWidth: "100%",
                }}
            />
        </Box>
    );
}

export { MainImage };
