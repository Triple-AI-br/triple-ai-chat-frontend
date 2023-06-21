import { MessageType } from "react-chat-elements";

interface ICreateAiMessage {
    id: string | number;
    date: number | Date;
    text: string;
}

const COMPANY_COLOR = "#477468";

const createAiMessage = ({
    id,
    date,
    text,
}: ICreateAiMessage): MessageType => ({
    id,
    titleColor: COMPANY_COLOR,
    status: "read",
    notch: true,
    retracted: false,
    forwarded: false,
    replyButton: false,
    removeButton: false,
    date,
    focus: false,
    position: "left",
    type: "text",
    title: "Timenow AI:",
    text,
    className: "chat-bubble chat-left-bubble",
});

const createUserMessage = ({
    id,
    date,
    text,
}: ICreateAiMessage): MessageType => ({
    id,
    titleColor: "#77c",
    status: "read",
    notch: true,
    retracted: false,
    forwarded: false,
    replyButton: false,
    removeButton: false,
    date,
    focus: false,
    position: "right",
    type: "text",
    title: "You:",
    text,
    className: "chat-bubble chat-right-bubble",
});

export const messageManager = { createAiMessage, createUserMessage };
