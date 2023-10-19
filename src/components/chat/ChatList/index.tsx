import { Collapse, CollapseProps, Typography } from "antd";
import { ChatItem } from "../ChatItem";
import { IChat } from "../types";
import { useTranslation } from "react-i18next";
import { HistoryOutlined } from "@ant-design/icons";
import moment from "moment";

interface IChatListProps {
  chats: IChat[];
  anonymousChats?: IChat[];
  handleSelectChat(args: { sessionId: number }): void;
  handleDelete(args: { sessionId: number }): Promise<void>;
}

const ChatList = ({ chats, handleSelectChat, handleDelete, anonymousChats }: IChatListProps) => {
  const { t } = useTranslation();

  // Função para obter a categoria da data
  function getDataCategory(data: string) {
    const formatterDate = moment(data);
    const today = moment();
    const yesterday = moment().subtract(1, "days");
    const sevenDaysAgo = moment().subtract(7, "days");
    const thirtyDaysAgo = moment().subtract(30, "days");
    const firstDayOfLastMonth = moment().subtract(1, "months").startOf("month");
    const lastDayOfLastMonth = moment().subtract(1, "months").endOf("month");
    const firstDayOfTheMonthBeforeLast = moment().subtract(2, "months").startOf("month");
    const lastDayOfTheMonthBeforeLast = moment().subtract(2, "months").endOf("month");

    if (formatterDate.isSame(today, "day")) {
      return t("pages.chat.components.timestamp.today");
    } else if (formatterDate.isSame(yesterday, "day")) {
      return t("pages.chat.components.timestamp.yesterday");
    } else if (formatterDate.isAfter(sevenDaysAgo)) {
      return t("pages.chat.components.timestamp.sevenDaysAgo");
    } else if (formatterDate.isAfter(thirtyDaysAgo)) {
      return t("pages.chat.components.timestamp.thirtyDaysAgo");
    } else if (formatterDate.isBetween(firstDayOfLastMonth, lastDayOfLastMonth, "day", "[]")) {
      return t("pages.chat.components.timestamp.lastMonth");
    } else if (
      formatterDate.isBetween(
        firstDayOfTheMonthBeforeLast,
        lastDayOfTheMonthBeforeLast,
        "day",
        "[]",
      )
    ) {
      return t("pages.chat.components.timestamp.monthBeforeLast");
    }

    // Se não se encaixar em nenhuma categoria, retorna a própria data
    return t("pages.chat.components.timestamp.moreThanSixtyDaysAgo");
  }

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
        anonymousChats?.map((chat, idx) => {
          const date = getDataCategory(chat.date);
          if (idx === 0 || getDataCategory(anonymousChats[idx - 1].date) !== date) {
            return (
              <>
                <Typography.Text type="secondary" style={{ fontSize: "12px" }}>
                  {date}
                </Typography.Text>
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
              </>
            );
          } else {
            return (
              <ChatItem
                key={chat.id}
                email={chat.email}
                id={chat.id}
                subtitle={chat.subtitle}
                date={chat.date}
                anonymous={true}
                isSelected={chat.isSelected}
                onClick={handleSelectChat}
                onDelete={handleDelete}
              />
            );
          }
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
          chats.map((item, index) => {
            const date = getDataCategory(item.date);
            if (index === 0 || getDataCategory(chats[index - 1].date) !== date) {
              return (
                <>
                  <Typography.Text type="secondary" style={{ fontSize: "12px" }}>
                    {date}
                  </Typography.Text>
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
                </>
              );
            } else {
              return (
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
              );
            }
          })
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
