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
            references={message.references}
          />
        ) : (
          <UserMessageBubble
            key={message.id}
            markdownText={message.text}
            date_time={message.date_time}
          />
        )
      )}
    </>
  );
};

export { MessageList };
