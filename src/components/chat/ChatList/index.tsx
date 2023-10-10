import { Menu, MenuProps, Typography } from "antd";
import { ChatItem } from "../ChatItem";
import { IChat } from "../types";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";
import { ChatsScroll } from "./styled";
import { HistoryOutlined } from "@ant-design/icons";

interface IChatListProps {
  chats: IChat[];
  anonymousChats?: IChat[];
  handleSelectChat(args: { sessionId: number }): void;
  handleDelete(args: { sessionId: number }): Promise<void>;
}

const ChatList = ({ chats, handleSelectChat, handleDelete, anonymousChats }: IChatListProps) => {
  const { t } = useTranslation();

  const items2: MenuProps["items"] = [
    {
      key: "sub1",
      icon: <HistoryOutlined />,
      label: t("pages.chat.components.anonymousChat"),
      children: anonymousChats?.length
        ? anonymousChats?.map((chat, index) => {
            const subKey = index * 4 + 1;
            return {
              key: subKey,
              label: chat.title,
            };
          })
        : [
            {
              key: 0,
              label: <Typography.Text color="#555">{t("pages.chat.noChats")}</Typography.Text>,
            },
          ],
    },
  ];

  return (
    <>
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["1"]}
        style={{ height: "100%" }}
        items={items2}
      />
      <ChatsScroll>
        {chats.length ? (
          chats.map((item) => (
            <ChatItem
              key={item.id}
              email={item.email}
              id={item.id}
              subtitle={item.subtitle}
              date={item.date}
              isSelected={item.isSelected}
              onClick={handleSelectChat}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <Box width="100%" pt={2} display="flex" flexDirection="column" alignItems="center">
            <Typography color="#555">{t("pages.chat.noChats")}</Typography>
            <Typography color="#555">{t("pages.chat.createChats")}</Typography>
          </Box>
        )}
      </ChatsScroll>
    </>
  );
};

export { ChatList };
