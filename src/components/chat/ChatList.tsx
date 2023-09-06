import { ChatItem } from ".";
import { ICustomerData } from "../../redux/authenticationSlice";
import { IChat } from "./types";

interface IChatListProps {
    chats: IChat[];
    handleSelectChat(args: { sessionId: number }): void;
    handleDelete(args: { sessionId: number }): Promise<void>;
    customerData?: ICustomerData | null;
}

const ChatList = ({
  chats,
  handleSelectChat,
  handleDelete,
  customerData,
}: IChatListProps) => {
  return (
    <>
      {chats.map(item => (
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
    </>
  );
};

export { ChatList };
