import { MessageBubble } from "./MessageBubble";

interface IUserMessageBubbleProps {
    markdownText: string;
}

const UserMessageBubble = ({ markdownText }: IUserMessageBubbleProps) => {
    return (
        <MessageBubble
            float="right"
            backgroundColor="#fafffa"
            markdownText={markdownText}
            borderBottomRightRadius={0}
        />
    );
};

export { UserMessageBubble };
