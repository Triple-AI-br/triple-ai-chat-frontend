import { ChatItem } from ".";
import { IChat } from "./types";

interface IChatListProps {
    chats: IChat[];
    title: string;
    handleSelectChat(args: { sessionId: string }): void;
    handleDelete(args: { sessionId: string }): Promise<void>;
}

const ChatList = ({
    chats,
    title,
    handleSelectChat,
    handleDelete,
}: IChatListProps) => {
    return (
        <>
            {chats.map(item => (
                <ChatItem
                    key={item.id}
                    id={item.id}
                    title={title}
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
