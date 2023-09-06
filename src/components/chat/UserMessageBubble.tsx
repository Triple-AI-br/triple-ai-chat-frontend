import { MessageBubble } from "./MessageBubble";

interface IUserMessageBubbleProps {
    markdownText: string;
    date_time: string;
}

const UserMessageBubble = ({
  markdownText,
  date_time,
}: IUserMessageBubbleProps) => {
  return (
    <MessageBubble
      float="right"
      backgroundColor="#fafffa"
      markdownText={markdownText}
      borderBottomRightRadius={0}
      date_time={date_time}
    />
  );
};

export { UserMessageBubble };
