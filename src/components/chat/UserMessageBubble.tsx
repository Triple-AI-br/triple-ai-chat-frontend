import { MessageBubble } from "./MessageBubble";

interface IUserMessageBubbleProps {
  markdownText: string;
  date_time: string;
}

const UserMessageBubble = ({ markdownText, date_time }: IUserMessageBubbleProps) => {
  return <MessageBubble float="right" markdownText={markdownText} date_time={date_time} />;
};

export { UserMessageBubble };
