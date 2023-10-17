import { MessageBubble } from "./MessageBubble";

interface IUserMessageBubbleProps {
  markdownText: string;
  references?: string[];
}

const BotMessageBubble = ({ markdownText, references }: IUserMessageBubbleProps) => {
  return <MessageBubble float="left" markdownText={markdownText} references={references} />;
};

export { BotMessageBubble };
