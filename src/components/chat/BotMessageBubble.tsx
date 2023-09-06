import { MessageBubble } from "./MessageBubble";

interface IUserMessageBubbleProps {
    markdownText: string;
    references?: string[];
}

const BotMessageBubble = ({
  markdownText,
  references,
}: IUserMessageBubbleProps) => {
  return (
    <MessageBubble
      float="left"
      backgroundColor="#fff"
      markdownText={markdownText}
      borderBottomLeftRadius={0}
      references={references}
    />
  );
};

export { BotMessageBubble };
