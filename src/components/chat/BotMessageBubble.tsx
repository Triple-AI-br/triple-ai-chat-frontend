import { MessageBubble } from "./MessageBubble";

interface IUserMessageBubbleProps {
    markdownText: string;
}

const BotMessageBubble = ({ markdownText }: IUserMessageBubbleProps) => {
    return (
        <MessageBubble
            float="left"
            backgroundColor="#fff"
            markdownText={markdownText}
            borderBottomLeftRadius={0}
        />
    );
};

export { BotMessageBubble };
