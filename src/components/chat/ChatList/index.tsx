import { Typography } from "antd";
import { ChatItem } from "..";
import { ICustomerData } from "../../../redux/authenticationSlice";
import { IChat } from "../types";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";
import { CollapseStyled } from "./styled";
import { useState } from "react";

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
  const [activeCollapses, setActiveCollapses] = useState<number>(0);

  const renderChats = () => {
    const projectChats = {
      key: "1",
      label: t("pages.chat.components.projectChats"),
      children: (
        <div>
          {chats.length ? (
            chats.map((item) => (
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
            <Box width="100%" pt={2} display="flex" flexDirection="column" alignItems="center">
              <Typography color="#555">{t("pages.chat.noChats")}</Typography>
              <Typography color="#555">{t("pages.chat.createChats")}</Typography>
            </Box>
          )}
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
                anonymous={true}
                isSelected={item.isSelected}
                onClick={handleSelectChat}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <Typography.Text color="#555">{t("pages.chat.noChats")}</Typography.Text>
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

  console.log(activeCollapses);
  return (
    <CollapseStyled
      items={renderChats()}
      $length={activeCollapses}
      onChange={() => {
        const activeItems = document.querySelectorAll(".ant-collapse-item-active");
        setActiveCollapses(activeItems.length);
      }}
      defaultActiveKey={["1", "2"]}
      bordered={false}
    />
  );
};

export { ChatList };
