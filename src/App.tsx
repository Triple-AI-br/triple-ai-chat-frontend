import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { ThemeProvider } from "@mui/material";
import { DefaultTheme, config } from "./themes";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ConfigProvider } from "antd";
import { CustomSnackbar } from "./components/shared";
import { TermsOfUseTimenowModal } from "./components/shared/TermsOfUseTimenowModal";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID as string}>
      <BrowserRouter>
        <Provider store={store}>
          <ConfigProvider theme={config}>
            <ThemeProvider theme={DefaultTheme}>
              <CustomSnackbar />
              <TermsOfUseTimenowModal />
              <AppRoutes />
            </ThemeProvider>
          </ConfigProvider>
        </Provider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
