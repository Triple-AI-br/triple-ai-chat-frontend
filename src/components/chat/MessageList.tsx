import { BotMessageBubble } from "./BotMessageBubble";
import { UserMessageBubble } from "./UserMessageBubble";
import { IMessage } from "./types";

interface IMessageListProps {
    messages: IMessage[];
}

const MessageList = ({ messages }: IMessageListProps) => {
    return (
        <>
            {messages.map(message =>
                message.type === "bot" ? (
                    <BotMessageBubble
                        key={`bot_${message.id}`}
                        markdownText={message.text}
                    />
                ) : (
                    <UserMessageBubble
                        key={message.id}
                        markdownText={message.text}
                    />
                )
            )}
        </>
    );
};

export { MessageList };
