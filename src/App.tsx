import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { ThemeProvider } from "@mui/material";
import { DefaultTheme, config } from "./themes";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ConfigProvider } from "antd";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <ConfigProvider theme={config}>
          <ThemeProvider theme={DefaultTheme}>
            <AppRoutes />
          </ThemeProvider>
        </ConfigProvider>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
