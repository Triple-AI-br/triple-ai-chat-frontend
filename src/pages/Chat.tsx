import { useEffect, useRef, useState } from "react";
import { MessageList, MessageType } from "react-chat-elements";
import { chatManager } from "../services";
import { v4 as uuidv4 } from "uuid";
import { messageManager } from "../utils";
import { Spinner } from "../components/loaders";
import { ChatBar, ChatItem, TextArea } from "../components/chat";
import {
    Box,
    Button as MuiButton,
    Typography,
    Avatar as MuiAvatar,
    Skeleton,
} from "@mui/material";
import {
    LibraryAdd as AddIcon,
    Forward as SendIcon,
} from "@mui/icons-material";

const COMPANY_COLOR = "#376458";
const BOT_NAME = "Timenow AI";
const PROJECT_ID = 4328;
const GRAY_COLOR = "#f5f5f5";
const INITIAL_TEXT =
    "Olá, sou uma inteligência artificial treinada pela Timenow. Você pode me perguntar a respeito de assuntos como: Guia Time Knowledge, Agenda do Líder e muito mais.";
const DEFAULT_MESSAGE: MessageType = messageManager.createAiMessage({
    id: uuidv4(),
    date: Date.now(),
    text: INITIAL_TEXT,
});

interface IChat {
    id: string;
    title: string;
    subtitle: string;
    date: string;
    isSelected: boolean;
}
const ChatPage = () => {
    const messageListReferance = useRef();
    const bottomRef = useRef<HTMLInputElement>(null);
    const [isLoadingMessages, setIsLoadingMessages] = useState(false);
    const [isLoadingAiResponse, setIsLoadingAiResponse] = useState(false);
    const [currentMessage, setCurrentMessage] = useState("");
    const [selectedChat, setSelectedChat] = useState<string>();
    const [chatList, setChatList] = useState<IChat[]>([]);
    const [messageList, setMessageList] = useState<MessageType[]>([
        DEFAULT_MESSAGE,
    ]);

    // Scrolls to bottom every time messageList or isLoadingAiResponse is modified
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messageList, isLoadingAiResponse]);

    // Delete chat
    const handleDelete = async ({ sessionId }: { sessionId: string }) => {
        if (!confirm("Are you sure you'd like to delete this chat?")) return;
        setChatList(prevChatList =>
            prevChatList.filter(item => item.id !== sessionId)
        );
        const success = await chatManager.deleteChat({
            projectId: PROJECT_ID,
            sessionId,
        });
        if (success) {
            if (selectedChat == sessionId) {
                setSelectedChat(undefined);
                setMessageList([DEFAULT_MESSAGE]);
            }
        }
    };

    const handleNewChat = async () => {
        setIsLoadingMessages(true);
        const newChat = await chatManager.createNewChat({
            projectId: PROJECT_ID,
        });
        setChatList(prevChatList => [
            {
                id: newChat.session_id,
                date: newChat.updated_at,
                isSelected: true,
                subtitle: newChat.name,
                title: newChat.name,
            },
            ...prevChatList,
        ]);
        setSelectedChat(newChat.session_id);
    };

    // Initial load of chats
    useEffect(() => {
        (async () => {
            const conversations = await chatManager.listChats({
                projectId: PROJECT_ID,
            });
            setChatList(
                conversations.map(item => ({
                    id: item.session_id,
                    title: BOT_NAME,
                    subtitle: item.name,
                    date: item.updated_at,
                    isSelected: false,
                    onClick: handleSelectChat,
                    onDelete: handleDelete,
                }))
            );
        })();
    }, []);

    // Store selected chat session id
    const handleSelectChat = ({ sessionId }: { sessionId: string }) => {
        setSelectedChat(sessionId);
    };

    // Runs when a new chat is selected
    useEffect(() => {
        (async () => {
            if (!selectedChat) {
                return;
            }
            setChatList(prevList => {
                const newValue = prevList.map(item => {
                    return {
                        ...item,
                        isSelected: item.id === selectedChat,
                    };
                });
                return newValue;
            });
            setIsLoadingMessages(true);
            const conversation = await chatManager.retrieveChat({
                projectId: PROJECT_ID,
                sessionId: selectedChat,
            });
            const messages: MessageType[] = [DEFAULT_MESSAGE];
            conversation.reverse().forEach(item => {
                messages.push(
                    messageManager.createUserMessage({
                        id: item.id,
                        date: new Date(item.updated_at),
                        text: item.user_query,
                    })
                );
                messages.push(
                    messageManager.createAiMessage({
                        id: item.id,
                        date: new Date(item.updated_at),
                        text: item.openai_response,
                    })
                );
            });
            setIsLoadingMessages(false);
            setMessageList(messages);
        })();
    }, [selectedChat]);

    // Send message when Enter is pressed
    const handleEnterPressed = (event: React.KeyboardEvent<Element>) => {
        if (event.key === "Enter") {
            handleSendMessage();
        }
    };

    // Keep track of the state
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value;
        if (text[text.length - 1] === "\n" || text[text.length - 1] === "\r")
            return;
        setCurrentMessage(e.target.value);
    };

    // Send message
    const handleSendMessage = async () => {
        if (
            !selectedChat ||
            currentMessage === "" ||
            isLoadingAiResponse ||
            isLoadingMessages
        )
            return;
        setCurrentMessage("");
        setIsLoadingAiResponse(true);
        const newUserMessage: MessageType = messageManager.createUserMessage({
            id: uuidv4(),
            date: Date.now(),
            text: currentMessage,
        });
        setMessageList(prevMessageList => [...prevMessageList, newUserMessage]);

        const response = await chatManager.sendMessage({
            prompt: currentMessage,
            projectId: PROJECT_ID,
            sessionId: selectedChat,
        });
        const newAiResponse: MessageType = messageManager.createAiMessage({
            id: response.id,
            date: new Date(response.updated_at),
            text: response.openai_response,
        });

        setIsLoadingAiResponse(false);
        setMessageList(prevMessageList => [...prevMessageList, newAiResponse]);
    };

    return (
        // Main container
        <Box sx={{ display: "flex", height: "100vh" }}>
            {/* Left column container */}
            <Box
                display="flex"
                flexDirection="column"
                minWidth="300px"
                maxWidth="40%"
                borderRight="1px solid #ccc"
            >
                <Box
                    display="flex"
                    gap={2}
                    py={1}
                    px="auto"
                    alignItems="center"
                    justifyContent="space-evenly"
                    sx={{ backgroundColor: COMPANY_COLOR }}
                >
                    <MuiAvatar
                        src="https://timenow.com.br/wp-content/uploads/2023/03/timenow-destaque-1.png"
                        alt="Timenow logo"
                        sx={{ width: 80, height: 80, mr: -3 }}
                    />
                    <Typography color="#fff" fontWeight={600} fontSize={18}>
                        Timenow AI Chatbot
                    </Typography>
                    <MuiButton
                        onClick={handleNewChat}
                        size="small"
                        variant="outlined"
                        startIcon={<AddIcon />}
                        sx={{
                            mr: 2,
                            color: "#fff",
                            borderColor: "#fff",
                            ":hover": { borderColor: "#ccc", color: "#ccc" },
                        }}
                    >
                        New chat
                    </MuiButton>
                </Box>
                <Box overflow="scroll">
                    {chatList.map(item => (
                        <ChatItem
                            key={item.id}
                            id={item.id}
                            title={BOT_NAME}
                            subtitle={item.subtitle}
                            date={item.date}
                            isSelected={item.isSelected}
                            onClick={handleSelectChat}
                            onDelete={handleDelete}
                        />
                    ))}
                </Box>
            </Box>

            {/* Right column container */}
            <div
                style={{
                    flex: 1,
                    backgroundColor: GRAY_COLOR,
                }}
            >
                <div
                    style={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                    }}
                >
                    {!isLoadingMessages && selectedChat && <ChatBar />}
                    {isLoadingMessages ? (
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            height="100%"
                        >
                            <Spinner />
                        </Box>
                    ) : selectedChat ? (
                        <Box
                            display="flex"
                            flexDirection="column"
                            height="100%"
                            sx={{ overflow: "scroll" }}
                        >
                            <MessageList
                                referance={messageListReferance}
                                className="message-list"
                                lockable={true}
                                toBottomHeight={"100%"}
                                dataSource={messageList}
                            />

                            {isLoadingAiResponse && (
                                <Box paddingLeft={3} paddingBottom={2}>
                                    <Skeleton
                                        variant="rounded"
                                        width="50%"
                                        height={50}
                                    />
                                </Box>
                            )}
                            <div ref={bottomRef} />
                        </Box>
                    ) : (
                        <Box
                            display="flex"
                            width="100%"
                            height="100%"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Typography color="#999" fontSize={17}>
                                Please select a chat on the left panel
                            </Typography>
                        </Box>
                    )}
                    {selectedChat && !isLoadingMessages && (
                        <Box
                            width="100%"
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            gap={1}
                            sx={{
                                backgroundColor: "white",
                                borderTop: "1px solid #ccc",
                            }}
                        >
                            <TextArea
                                autoFocus
                                value={currentMessage}
                                onChange={handleChange}
                                onKeyDown={handleEnterPressed}
                            />
                            <Box
                                onClick={handleSendMessage}
                                sx={{
                                    borderRadius: 1,
                                    backgroundColor: COMPANY_COLOR,
                                    cursor: "pointer",
                                    p: 1.5,
                                    my: 1,
                                    mr: 1,
                                }}
                            >
                                <SendIcon
                                    sx={{
                                        transform: "rotate(-90deg)",
                                        color: "#fff",
                                    }}
                                />
                            </Box>
                        </Box>
                    )}
                </div>
            </div>
        </Box>
    );
};

export { ChatPage };
