import { Collapse, Typography } from "antd";
import { ChatItem } from ".";
import { ICustomerData } from "../../redux/authenticationSlice";
import { IChat } from "./types";
import { useTranslation } from "react-i18next";

interface IChatListProps {
  chats: IChat[];
  anonymousChats?: IChat[];
  handleSelectChat(args: { sessionId: number }): void;
  handleDelete(args: { sessionId: number }): Promise<void>;
  customerData?: ICustomerData | null;
}

const ChatList = ({
  chats,
  handleSelectChat,
  handleDelete,
  customerData,
  anonymousChats,
}: IChatListProps) => {
  const { t } = useTranslation();

  const renderChats = () => {
    const projectChats = {
      key: "1",
      label: t("pages.chat.components.projectChats"),
      children: (
        <div>
          {chats.map((item) => (
            <ChatItem
              customerData={customerData}
              key={item.id}
              email={item.email}
              id={item.id}
              subtitle={item.subtitle}
              date={item.date}
              isSelected={item.isSelected}
              onClick={handleSelectChat}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ),
    };

    const anonymous = {
      key: "2",
      label: t("pages.chat.components.anonymousChat"),
      children: (
        <div>
          {anonymousChats?.length ? (
            anonymousChats?.map((item) => (
              <ChatItem
                customerData={customerData}
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
            <Typography.Text italic>{t("pages.chat.noChats")}</Typography.Text>
          )}
        </div>
      ),
    };
    const panels = [projectChats];
    if (anonymousChats !== undefined) {
      panels.unshift(anonymous);
    }
    return panels;
  };

  return (
    <Collapse
      style={{ backgroundColor: "#f5f5f5" }}
      items={renderChats()}
      defaultActiveKey={["1"]}
      bordered={false}
    />
  );
};

export { ChatList };
