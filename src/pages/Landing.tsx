/* eslint-disable indent */
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { FirstSection } from "../components/Landing";
import { CustomAppBar } from "../components/Landing/CustomAppBar";

function LandingPage() {
    const theme = useTheme();
    const isScreenXs = useMediaQuery(theme.breakpoints.only("xs"));
    const isScreenSm = useMediaQuery(theme.breakpoints.only("sm"));

    return (
        // Background Box
        <Box display="flex" flexDirection="column" height="100vh" width="100vw">
            <CustomAppBar />
            {/* Container Box */}
            <Box
                px={theme.spacing(isScreenXs ? 2 : isScreenSm ? 5 : 10)}
                pt={theme.spacing(isScreenSm || isScreenXs ? 5 : 10)}
                pb={5}
                display="flex"
                flexDirection="column"
                flexWrap="nowrap"
                gap={9}
            >
                <FirstSection />
                <Box mt="auto" display="flex" justifyContent="center">
                    <Typography color="#777">
                        © Triple AI. Todos os direitos reservados.
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}

export { LandingPage };
