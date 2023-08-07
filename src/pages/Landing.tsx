import { Box, Chip, Typography, useMediaQuery, useTheme } from "@mui/material";
import { FirstSection, PrivacyTerms } from "../components/Landing";
import { CustomAppBar } from "../components/Landing/CustomAppBar";

function LandingPage() {
    const WPP_URL =
        "http://api.whatsapp.com/send?phone=5527981213951&text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20os%20produtos%20Triple%20AI,%20e%20como%20podem%20ajudar%20a%20minha%20empresa.";
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
                <Box display="flex" gap={1} alignItems="center">
                    <Typography fontWeight={600} color="#555">
                        Contatos:
                    </Typography>
                    <Chip
                        label="fundadores@tripleai.com.br"
                        sx={{ p: 2, color: "#444" }}
                        onClick={e => {
                            const mailto =
                                "mailto:fundadores@tripleai.com.br?subject=Informações sobre a Triple AI&body=Olá, %0D%0A %0D%0A Gostaria de saber como os produtos da Triple AI podem ajudar a minha empresa a faturar mais. %0D%0A %0D%0A Obrigado.";
                            window.location.href = mailto;
                            e.preventDefault();
                        }}
                    />
                    <Chip
                        label="(27) 98121-3951"
                        sx={{ p: 2, color: "#444" }}
                        onClick={() =>
                            window.open(WPP_URL, "_blank", "noreferrer")
                        }
                    />
                    <PrivacyTerms />
                </Box>
            </Box>

            <a target="_blank" rel="noreferrer" href={WPP_URL}>
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
            <Box
                display="flex"
                flexDirection="column"
                mt="auto"
                alignItems="center"
                width="100%"
                pb={1}
            >
                <Typography fontSize={14} color="#888">
                    © Triple AI. Todos os direitos reservados.
                </Typography>
            </Box>
        </Box>
    );
}

export { LandingPage };
