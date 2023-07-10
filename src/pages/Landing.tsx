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
                <a
                    target="_blank"
                    rel="noreferrer"
                    href="http://api.whatsapp.com/send?phone=5527981213951&text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20os%20produtos%20Triple%20AI,%20e%20como%20podem%20ajudar%20a%20minha%20empresa."
                >
                    <img
                        style={{
                            maxWidth: 70,
                            position: "fixed",
                            right: 10,
                            bottom: 10,
                        }}
                        src={`${process.env.REACT_APP_BASE_FRONT_URL}/wpp.png`}
                    />
                </a>
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
