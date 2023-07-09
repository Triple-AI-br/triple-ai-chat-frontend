import { Box, useMediaQuery, useTheme } from "@mui/material";
import { Body, MainImage, LaunchAppButton, Title } from "./";

function FirstSection() {
    const theme = useTheme();
    const isScreenXs = useMediaQuery(theme.breakpoints.only("xs"));
    const isScreenSm = useMediaQuery(theme.breakpoints.only("sm"));

    return (
        <Box
            display="flex"
            justifyContent="center"
            flexWrap="wrap"
            gap={7}
            component="section"
            flexDirection="row"
        >
            {/* Left Column */}
            <Box
                display="flex"
                flexDirection="column"
                gap={7}
                alignItems="center"
                maxWidth={isScreenXs ? "90%" : isScreenSm ? "70%" : "55%"}
            >
                <Title />
                <Body />
                {/* Buttons Box */}
                <Box
                    display="flex"
                    flexDirection="column"
                    maxWidth="300px"
                    alignItems="center"
                    width="100%"
                    gap={4}
                >
                    <LaunchAppButton />
                </Box>
            </Box>
            {/* Right column */}
            <Box
                display="flex"
                flexDirection="column"
                gap={2}
                alignItems="center"
            >
                <MainImage />
            </Box>
        </Box>
    );
}

export { FirstSection };
