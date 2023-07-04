import { Box } from "@mui/material";
import { LoginForm } from "../components/Auth";
import { CustomSnackbar } from "../components/shared";

const LoginPage = () => {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            sx={{ backgroundColor: "#e0e0e0" }}
        >
            <CustomSnackbar />
            <Box
                paddingX={8}
                paddingBottom={10}
                paddingTop={6}
                mt={4}
                borderRadius={3}
                boxShadow="6px 6px 15px 2px rgba(0, 0, 0, 0.12)"
                sx={{ backgroundColor: "#fff" }}
                overflow="scroll"
                minWidth="500px"
                maxWidth="700px"
            >
                <LoginForm />
            </Box>
        </Box>
    );
};

export { LoginPage };
