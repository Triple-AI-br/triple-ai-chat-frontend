import { Box, Typography } from "@mui/material";

function Body() {
    return (
        <Box>
            <Typography
                color="#FFFFFF7A"
                align="center"
                component="p"
                sx={{ fontSize: "1.2rem" }}
            >
                Você tem milhares de documentos espalhados na sua empresa?
            </Typography>
            <Typography
                color="#FFFFFF7A"
                align="center"
                sx={{ fontSize: "1.2rem" }}
            >
                Desde apresentações até documentações de processos?
            </Typography>
            <Typography
                color="#FFFFFF7A"
                align="center"
                sx={{ fontSize: "1.2rem", mt: 2 }}
                fontWeight={600}
            >
                Nós temos a solução!
            </Typography>
        </Box>
    );
}

export { Body };
