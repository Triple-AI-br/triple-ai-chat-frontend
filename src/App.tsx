import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import "react-chat-elements/dist/main.css";
import { ThemeProvider } from "@mui/material";
import { DefaultTheme } from "./themes";

function App() {
    return (
        <BrowserRouter>
            <ThemeProvider theme={DefaultTheme}>
                <AppRoutes />
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;
