import { LeftTopBar } from "./LeftTopBar";
import { ScrollChats } from "../../../pages/Chat/styled";
import { Box, CircularProgress } from "@mui/material";
import { ChatList } from "../ChatList";
import { IChat } from "../types";
import { ICustomerData } from "../../../redux/authenticationSlice";
import Sider from "antd/es/layout/Sider";
import { Button, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

type DrawerChatProps = {
  chats?: IChat[];
  customerData?: ICustomerData | null;
  handleNewChat(): Promise<void>;
  anonymousChats?: IChat[];
  handleDelete: ({ sessionId }: { sessionId: number }) => Promise<void>;
  handleSelectChat: ({ sessionId }: { sessionId: number }) => void;
};

const DrawerChat: React.FC<DrawerChatProps> = ({
  chats,
  customerData,
  handleNewChat,
  anonymousChats,
  handleDelete,
  handleSelectChat,
}) => {
  const { t } = useTranslation();
  return (
    <Sider
      style={{
        position: "fixed",
        left: "0px",
        height: "100vh",
        padding: "12px",
        backgroundColor: "#FFF",
      }}
      trigger={null}
      collapsible
      collapsed={false}
      width={300}
      collapsedWidth={0}
    >
      <LeftTopBar customerData={customerData} />
      <Button
        onClick={handleNewChat}
        size="large"
        icon={<PlusOutlined />}
        style={{ fontSize: "14px" }}
      >
        <Typography.Text>{t("pages.chat.components.newChatBtn")}</Typography.Text>
      </Button>
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
            handleSelectChat={handleSelectChat}
          />
        )}
      </ScrollChats>
    </Sider>
  );
};

export { DrawerChat };
