import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { ThemeProvider } from "@mui/material";
import { DefaultTheme } from "./themes";
import { Provider } from "react-redux";
import { store } from "./redux/store";

function App() {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <ThemeProvider theme={DefaultTheme}>
                    <AppRoutes />
                </ThemeProvider>
            </Provider>
        </BrowserRouter>
    );
}

export default App;
