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
  function getCategoriaDaData(data: string) {
    const dataConversa = moment(data);
    const hoje = moment();
    const ontem = moment().subtract(1, "days");
    const seteDiasAtras = moment().subtract(7, "days");
    const trintaDiasAtras = moment().subtract(30, "days");
    const primeiroDiaMesPassado = moment().subtract(1, "months").startOf("month");
    const ultimoDiaMesPassado = moment().subtract(1, "months").endOf("month");
    const primeiroDiaMesRetrasado = moment().subtract(2, "months").startOf("month");
    const ultimoDiaMesRetrasado = moment().subtract(2, "months").endOf("month");

    if (dataConversa.isSame(hoje, "day")) {
      return "Hoje";
    } else if (dataConversa.isSame(ontem, "day")) {
      return "Ontem";
    } else if (dataConversa.isAfter(seteDiasAtras)) {
      return "Últimos 7 dias";
    } else if (dataConversa.isAfter(trintaDiasAtras)) {
      return "Últimos 30 dias";
    } else if (dataConversa.isBetween(primeiroDiaMesPassado, ultimoDiaMesPassado, "day", "[]")) {
      return "Mês passado";
    } else if (
      dataConversa.isBetween(primeiroDiaMesRetrasado, ultimoDiaMesRetrasado, "day", "[]")
    ) {
      return "Mês retrasado";
    }

    // Se não se encaixar em nenhuma categoria, retorna a própria data
    return "";
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
          const date = getCategoriaDaData(chat.date);
          if (idx === 0 || getCategoriaDaData(anonymousChats[idx - 1].date) !== date) {
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
            const date = getCategoriaDaData(item.date);
            if (index === 0 || getCategoriaDaData(chats[index - 1].date) !== date) {
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
