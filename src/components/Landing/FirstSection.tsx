import { Box, useMediaQuery, useTheme } from "@mui/material";
import { Body, CodeImage, LaunchAppButton, Title } from "./";

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
                <CodeImage />
                <img
                    src={`${process.env.REACT_APP_BASE_FRONT_URL}/triple.png`}
                    style={{
                        maxWidth: "200px",
                    }}
                />
            </Box>
        </Box>
    );
}

export { FirstSection };
