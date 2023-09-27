import { Box, Typography } from "@mui/material";
import { Select } from "antd";
import { languagesSupport } from "../../i18n";
import { setLanguageToStorage } from "../../utils/setLanguageToStorage";
import i18next from "i18next";

const ChatBar = () => {
  return (
    <Box
      px={3}
      py={2}
      sx={{ backgroundColor: "#fff" }}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      borderBottom="1px solid #ddd"
    >
      <Typography color="#777">Chat</Typography>
      <Select
        value={i18next.language}
        style={{ width: "200px", maxWidth: "40%" }}
        onChange={(key) => {
          setLanguageToStorage(key as "en" | "pt" | "es");
          i18next.changeLanguage(key);
        }}
        options={languagesSupport}
      />
    </Box>
  );
};
export { ChatBar };
