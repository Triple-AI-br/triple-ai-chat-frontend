import { Box } from "@mui/material";
import ReactMarkdown from "react-markdown";

interface IMessageBubbleProps {
    markdownText: string;
    backgroundColor: string;
    float?: "left" | "right";
    borderBottomRightRadius?: number;
    borderBottomLeftRadius?: number;
}

const MessageBubble = ({
    float,
    markdownText,
    backgroundColor,
    borderBottomRightRadius,
    borderBottomLeftRadius,
}: IMessageBubbleProps) => {
    return (
        <Box
            ml={float === "right" ? "auto" : 2}
            mr={float === "left" ? "auto" : 2}
            maxWidth="80%"
            px={3}
            py={1}
            borderRadius={5}
            my={1}
            sx={{
                backgroundColor,
                borderBottomRightRadius,
                borderBottomLeftRadius,
            }}
            border="1px solid #ccc"
            display={markdownText ? undefined : "none"}
        >
            <ReactMarkdown>{markdownText}</ReactMarkdown>
        </Box>
    );
};

export { MessageBubble };
