import { Collapse } from "antd";
import { ChatItem } from ".";
import { ICustomerData } from "../../redux/authenticationSlice";
import { IChat } from "./types";

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
  const renderChats = () => {
    const projectChats = {
      key: "2",
      label: "project chats",
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
      key: "1",
      label: "Widget chat historic",
      children: (
        <div>
          {anonymousChats?.map((item) => (
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
    const panels = [projectChats];
    if (anonymousChats !== undefined) {
      panels.push(anonymous);
    }
    return panels;
  };

  return (
    <Collapse
      style={{ backgroundColor: "#f5f5f5" }}
      items={renderChats()}
      defaultActiveKey={["2"]}
      bordered={false}
    />
  );
};

export { ChatList };
