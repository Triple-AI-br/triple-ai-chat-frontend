import { ChatItem } from ".";
import { IChat } from "./types";

interface IChatListProps {
    chats: IChat[];
    title: string;
    handleSelectChat(args: { sessionId: number }): void;
    handleDelete(args: { sessionId: number }): Promise<void>;
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
                    email={item.email}
                    id={item.id}
                    title={title}
                    subtitle={undefined}
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
