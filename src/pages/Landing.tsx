/* eslint-disable indent */
import {
    Box,
    Divider,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { FirstSection } from "../components/Landing";

function LandingPage() {
    const theme = useTheme();
    const isScreenXs = useMediaQuery(theme.breakpoints.only("xs"));
    const isScreenSm = useMediaQuery(theme.breakpoints.only("sm"));

    return (
        // Background Box
        <Box
            height="100vh"
            width="100vw"
            sx={{
                background:
                    "linear-gradient(55deg, rgba(67,31,84,1) 0%, rgba(15,15,18,1) 70%, rgba(23,37,74,1) 100%)",
                overflowY: "scroll",
                overflowX: "hidden",
            }}
        >
            {/* Container Box */}
            <Box
                px={theme.spacing(isScreenXs ? 2 : isScreenSm ? 5 : 10)}
                pt={theme.spacing(isScreenSm ? 10 : 20)}
                pb={5}
                display="flex"
                flexDirection="column"
                flexWrap="nowrap"
                gap={9}
            >
                <FirstSection />

                <Box width="80%" mx="auto">
                    <Divider color="#777" variant="middle" />
                </Box>
                <Box display="flex" justifyContent="center">
                    <Typography color="#777">
                        © Triple AI. Todos os direitos reservados.
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}

export { LandingPage };
