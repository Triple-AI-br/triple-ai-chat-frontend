import { Avatar, Box, Button, Typography } from "@mui/material";
import { LibraryAdd as AddIcon } from "@mui/icons-material";
import { ICustomerData } from "../../redux/authenticationSlice";
import { useTranslation } from "react-i18next";

// Will this trigger vercel deployment?
interface ILeftTopBarProps {
  handleNewChat(): void;
  customerData?: ICustomerData | null;
}
const LeftTopBar = ({ handleNewChat, customerData }: ILeftTopBarProps) => {
  const { t } = useTranslation();
  const backgroundColor = customerData?.main_color;
  const textColor = backgroundColor?.toLowerCase() === "#fff" ? "#777" : "#fff";

  return (
    <Box
      display="flex"
      py={2}
      alignItems="center"
      flexWrap="wrap"
      gap={1}
      sx={{ backgroundColor, borderBottom: "1px solid #aaa" }}
      px={2}
    >
      <Avatar src={customerData?.logo_url} sx={{ width: 80, height: 80 }} />
      <Typography color={textColor} fontWeight={600} fontSize={18} sx={{ mr: 5 }}>
        {t("pages.chat.yourConversations")}
      </Typography>
      <Button
        onClick={handleNewChat}
        size="small"
        variant="outlined"
        startIcon={<AddIcon />}
        sx={{
          ml: "auto",
          color: textColor,
          borderColor: textColor,
          ":hover": { borderColor: "#ccc", color: "#ccc" },
        }}
      >
        {t("pages.chat.components.newChatBtn")}
      </Button>
    </Box>
  );
};

export { LeftTopBar };
