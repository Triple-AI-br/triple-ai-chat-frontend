import { useEffect, useRef, useState } from "react";
import { chatService } from "../services";
import { v4 as uuidv4 } from "uuid";
import { Spinner } from "../components/loaders";
import {
    ChatBar,
    ChatList,
    LeftTopBar,
    MessageList,
    IChat,
    IMessage,
    TextChat,
} from "../components/chat";
import { Box, Typography, Skeleton } from "@mui/material";
import { useAppSelector } from "../redux/hooks";
import { selectAccessToken } from "../redux/authenticationSlice";

const BOT_NAME = "Timenow AI";
const PROJECT_ID = 4328;
const GRAY_COLOR = "#f5f5f5";
const INITIAL_TEXT =
    "Olá, sou a Inteligência Artificial da Timenow. Você pode me perguntar algo do tipo: Como eu solicito um reembolso?";
const DEFAULT_MESSAGE: IMessage = {
    id: uuidv4(),
    type: "bot",
    date: new Date(),
    text: INITIAL_TEXT,
};

const ChatPage = () => {
    const accessToken = useAppSelector(selectAccessToken);
    const bottomRef = useRef<HTMLInputElement>(null);
    const [isLoadingMessages, setIsLoadingMessages] = useState(false);
    const [isLoadingAiResponse, setIsLoadingAiResponse] = useState(false);
    const [currentMessage, setCurrentMessage] = useState("");
    const [selectedChat, setSelectedChat] = useState<string>();
    const [chats, setChats] = useState<IChat[]>([]);
    const [messageList, setMessageList] = useState<IMessage[]>([
        DEFAULT_MESSAGE,
    ]);

    // Scrolls to bottom every time messageList or isLoadingAiResponse is modified
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messageList, isLoadingAiResponse]);

    // Delete chat
    const handleDelete = async ({ sessionId }: { sessionId: string }) => {
        if (!confirm("Are you sure you'd like to delete this chat?")) return;
        setChats(prevChatList =>
            prevChatList.filter(item => item.id !== sessionId)
        );
        const success = await chatService.deleteChat({
            projectId: PROJECT_ID,
            sessionId,
            accessToken,
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
        const newChat = await chatService.createNewChat({
            projectId: PROJECT_ID,
            accessToken,
        });
        setChats(prevChatList => [
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
            if (!accessToken) return;

            const conversations = await chatService.listChats({
                projectId: PROJECT_ID,
                accessToken,
            });
            setChats(
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
    }, [accessToken]);

    // Store selected chat session id
    const handleSelectChat = ({ sessionId }: { sessionId: string }) => {
        setSelectedChat(sessionId);
    };

    // Runs when a new chat is selected, updates the selected chat
    useEffect(() => {
        (async () => {
            if (!selectedChat || !accessToken) {
                return;
            }
            setChats(prevList => {
                const newValue = prevList.map(item => {
                    return {
                        ...item,
                        isSelected: item.id === selectedChat,
                    };
                });
                return newValue;
            });
            setIsLoadingMessages(true);
            const conversation = await chatService.retrieveChat({
                projectId: PROJECT_ID,
                sessionId: selectedChat,
                accessToken,
            });
            const messages: IMessage[] = [DEFAULT_MESSAGE];
            conversation.reverse().forEach(item => {
                messages.push({
                    id: item.id,
                    type: "user",
                    date: new Date(item.updated_at),
                    text: item.user_query,
                });
                messages.push({
                    id: item.id,
                    type: "bot",
                    date: new Date(item.updated_at),
                    text: item.openai_response,
                });
            });
            setIsLoadingMessages(false);
            setMessageList(messages);
        })();
    }, [selectedChat, accessToken]);

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
        const newUserMessage: IMessage = {
            id: uuidv4(),
            type: "user",
            date: new Date(),
            text: currentMessage,
        };
        setMessageList(prevMessageList => [...prevMessageList, newUserMessage]);

        const response = await chatService.sendMessage({
            prompt: currentMessage,
            projectId: PROJECT_ID,
            sessionId: selectedChat,
            accessToken,
        });
        const newAiResponse: IMessage = {
            id: response.id,
            type: "bot",
            date: new Date(response.updated_at),
            text: response.openai_response,
        };

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
                <LeftTopBar handleNewChat={handleNewChat} />
                <Box overflow="scroll">
                    <ChatList
                        chats={chats}
                        handleDelete={handleDelete}
                        handleSelectChat={handleSelectChat}
                        title={BOT_NAME}
                    />
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
                            <MessageList messages={messageList} />

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
                        <TextChat
                            currentMessage={currentMessage}
                            handleChange={handleChange}
                            handleEnterPressed={handleEnterPressed}
                            handleSendMessage={handleSendMessage}
                        />
                    )}
                </div>
            </div>
        </Box>
    );
};

export { ChatPage };
