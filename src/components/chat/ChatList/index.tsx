import { Collapse, CollapseProps, Typography } from "antd";
import { ChatItem } from "../ChatItem";
import { IChat } from "../types";
import { useTranslation } from "react-i18next";
import { HistoryOutlined } from "@ant-design/icons";

interface IChatListProps {
  chats: IChat[];
  anonymousChats?: IChat[];
  handleSelectChat(args: { sessionId: number }): void;
  handleDelete(args: { sessionId: number }): Promise<void>;
}

const ChatList = ({ chats, handleSelectChat, handleDelete, anonymousChats }: IChatListProps) => {
  const { t } = useTranslation();

  const anonymousItems: CollapseProps["items"] = [
    {
      key: "1",
      label: (
        <Typography.Text style={{ display: "block", whiteSpace: "nowrap" }}>
          {t("pages.chat.components.anonymousChat")}
          <HistoryOutlined style={{ marginLeft: "10px" }} />
        </Typography.Text>
      ),

      children: anonymousChats?.length ? (
        anonymousChats?.map((chat) => {
          return (
            <ChatItem
              key={chat.id}
              email={chat.email}
              anonymous={true}
              id={chat.id}
              subtitle={chat.subtitle}
              date={chat.date}
              isSelected={chat.isSelected}
              onClick={handleSelectChat}
              onDelete={handleDelete}
            />
          );
        })
      ) : (
        <Typography.Text color="#555">{t("pages.chat.noChats")}</Typography.Text>
      ),
    },
  ];

  return (
    <>
      {anonymousChats !== undefined ? (
        <Collapse
          bordered={false}
          style={{
            backgroundColor: "#FFF",
            zIndex: 10,
            position: "sticky",
            top: 0,
            maxHeight: "100%",
            overflowY: "scroll",
          }}
          items={anonymousItems}
        />
      ) : null}
      <div>
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
          <div style={{ width: "100%", textAlign: "center" }}>
            <Typography color="#555">{t("pages.chat.noChats")}</Typography>
            <Typography color="#555">{t("pages.chat.createChats")}</Typography>
          </div>
        )}
      </div>
    </>
  );
};

export { ChatList };
