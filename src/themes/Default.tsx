import { createTheme } from "@mui/material";
import { ThemeConfig } from "antd";

const config: ThemeConfig = {
  token: {
    colorPrimary: "#1890ff",
    colorText: "#3e4352",
    colorTextSecondary: "red",
    fontFamily: "Poppins",
  },
};

const DefaultTheme = createTheme({
  typography: {
    fontFamily: "'Poppins', 'Inter', sans-serif",
  },
});

export { DefaultTheme, config };
