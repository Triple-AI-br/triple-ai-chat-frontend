import { Box } from "@mui/material";
import { Select, Typography } from "antd";
import { languagesSupport } from "../../i18n";
import { setLanguageToStorage } from "../../utils/setLanguageToStorage";
import i18next from "i18next";
import { IProject } from "../../services";
import { MenuFoldOutlined } from "@ant-design/icons";
import { IChat } from "./types";
import { useAppSelector } from "../../redux/hooks";
import { selectUserData } from "../../redux/authenticationSlice";

type ChatBarProps = {
  isDesktop: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  project?: IProject;
  loadedChat?: IChat;
};

const ChatBar: React.FC<ChatBarProps> = ({ isDesktop, setCollapsed, project, loadedChat }) => {
  const userData = useAppSelector(selectUserData);
  const isSuperUser = userData && userData.is_superuser;
  return (
    <Box
      px={isDesktop ? 5 : 2}
      py={2}
      sx={{ backgroundColor: "#fff", height: "60px", position: "sticky", top: 0, zIndex: 1000 }}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      {!isDesktop ? (
        <MenuFoldOutlined
          onClick={() => setCollapsed((prev) => !prev)}
          style={{ fontSize: "20px" }}
        />
      ) : null}
      {loadedChat && isSuperUser ? (
        <Typography.Text type="secondary">{loadedChat.email}</Typography.Text>
      ) : null}
      <Typography color="#777" style={{ margin: "0 auto" }}>
        {project?.title}
      </Typography>
      {isDesktop ? (
        <Select
          value={i18next.language}
          style={{ width: "200px", maxWidth: "40%" }}
          onChange={(key) => {
            setLanguageToStorage(key as "en" | "pt" | "es");
            i18next.changeLanguage(key);
          }}
          options={languagesSupport}
        />
      ) : null}
    </Box>
  );
};
export { ChatBar };
