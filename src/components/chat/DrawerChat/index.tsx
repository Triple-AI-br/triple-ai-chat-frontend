import { LeftTopBar } from "./LeftTopBar";
import { ScrollChats } from "../../../pages/Chat/styled";
import { Box, CircularProgress } from "@mui/material";
import { ChatList } from "../ChatList";
import { IChat } from "../types";
import { ICustomerData } from "../../../redux/authenticationSlice";
import Sider from "antd/es/layout/Sider";
import { Button, Select, Typography } from "antd";
import { LeftOutlined, PlusOutlined, RightOutlined, SettingOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { Footer } from "./styled";
import { useNavigate } from "react-router-dom";
import { routesManager } from "../../../routes/routesManager";
import { IProject } from "../../../services";
import i18next from "i18next";
import { setLanguageToStorage } from "../../../utils/setLanguageToStorage";
import { languagesSupport } from "../../../i18n";

type DrawerChatProps = {
  chats?: IChat[];
  customerData?: ICustomerData | null;
  handleNewChat(): Promise<void>;
  anonymousChats?: IChat[];
  handleDelete: ({ sessionId }: { sessionId: number }) => Promise<void>;
  handleSelectChat: ({ sessionId }: { sessionId: number }) => void;
  project?: IProject;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  collapsed: boolean;
  isDesktop: boolean;
};

const DrawerChat: React.FC<DrawerChatProps> = ({
  chats,
  customerData,
  anonymousChats,
  project,
  collapsed,
  isDesktop,
  handleNewChat,
  handleDelete,
  handleSelectChat,
  setCollapsed,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Sider
      style={{
        position: isDesktop ? "sticky" : "fixed",
        zIndex: 1001,
        left: "0px",
        top: "0px",
        height: "100vh",
        backgroundColor: "#FFF",
      }}
      trigger={null}
      collapsible={!isDesktop}
      collapsed={collapsed}
      onCollapse={() => setCollapsed((prev) => !prev)}
      width={isDesktop ? 300 : "85%"}
      collapsedWidth={0}
    >
      <LeftTopBar customerData={customerData} />
      <div style={{ padding: collapsed ? 0 : "12px", height: "calc(100vh - 85px)" }}>
        <Button
          onClick={handleNewChat}
          size="large"
          icon={<PlusOutlined />}
          style={{ fontSize: "14px", margin: "10px 0" }}
        >
          <Typography.Text>{t("pages.chat.components.newChatBtn")}</Typography.Text>
        </Button>
        {!isDesktop ? (
          <Select
            value={i18next.language}
            style={{ width: "100%", height: "35px", margin: "10px auto" }}
            onChange={(key) => {
              setLanguageToStorage(key as "en" | "pt" | "es");
              i18next.changeLanguage(key);
            }}
            options={languagesSupport}
          />
        ) : null}
        <ScrollChats>
          {chats === undefined ? (
            <Box display="flex" justifyContent="center" pt={3}>
              <CircularProgress sx={{ color: customerData?.main_color }} />
            </Box>
          ) : (
            <ChatList
              chats={chats}
              anonymousChats={anonymousChats}
              handleDelete={handleDelete}
              handleSelectChat={(e) => {
                handleSelectChat(e);
                if (!isDesktop) setCollapsed(true);
              }}
            />
          )}
        </ScrollChats>
        <Footer>
          <div
            className="card"
            onClick={() =>
              project?.id ? navigate(routesManager.getSourcesRoute(project.id)) : null
            }
          >
            <SettingOutlined style={{ color: "#3E4352", fontSize: "16px" }} />
            <Typography.Text>Configuração do projeto</Typography.Text>
          </div>
          <div className="card">
            <Typography.Text
              style={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              {project?.title}
            </Typography.Text>
          </div>
        </Footer>
        {isDesktop ? null : (
          <Button
            type="primary"
            onClick={() => setCollapsed((prev) => !prev)}
            shape="circle"
            style={{
              color: "black",
              border: "1px solid darkgray",
              background: "white",
              position: "absolute",
              top: 52,
              right: 0,
            }}
            icon={collapsed ? <RightOutlined size={1} /> : <LeftOutlined size={1} />}
            size="small"
          />
        )}
      </div>
    </Sider>
  );
};

export { DrawerChat };
