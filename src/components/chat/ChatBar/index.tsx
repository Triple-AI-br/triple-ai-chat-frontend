import { Select, Typography } from "antd";
import { languagesSupport } from "../../../i18n";
import { setLanguageToStorage } from "../../../utils/setLanguageToStorage";
import i18next from "i18next";
import { IProject } from "../../../services";
import { MenuFoldOutlined } from "@ant-design/icons";
import { IChat } from "../types";
import { useAppSelector } from "../../../redux/hooks";
import { selectUserData } from "../../../redux/authenticationSlice";
import { ChatBarContainer, InfoContainer } from "./styled";

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
    <ChatBarContainer>
      {!isDesktop ? (
        <MenuFoldOutlined
          onClick={() => setCollapsed((prev) => !prev)}
          style={{ fontSize: "30px", width: "30px", height: "30px", color: "#3e4352" }}
        />
      ) : null}
      <InfoContainer>
        <Typography color="#777">{project?.title}</Typography>
        {loadedChat && isSuperUser ? (
          <Typography.Text type="secondary">{loadedChat.email}</Typography.Text>
        ) : (
          <div></div>
        )}
      </InfoContainer>
      {isDesktop ? (
        <Select
          value={i18next.language}
          style={{ width: "40%", maxWidth: "200px" }}
          onChange={(key) => {
            setLanguageToStorage(key as "en" | "pt" | "es");
            i18next.changeLanguage(key);
          }}
          options={languagesSupport}
        />
      ) : null}
    </ChatBarContainer>
  );
};
export { ChatBar };
