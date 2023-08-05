import { useEffect, useRef, useState } from "react";
import { chatService, customerService } from "../services";
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
import { Box, CircularProgress, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { routesManager } from "../routes/routesManager";
import {
    ICustomerData,
    selectCustomerData,
} from "../redux/authenticationSlice";
import { useAppSelector } from "../redux/hooks";

const GRAY_COLOR = "#f5f5f5";

const ChatPage = () => {
    const { id } = useParams() as { id: string };
    const projectId = parseInt(id);
    const bottomRef = useRef<HTMLInputElement>(null);
    const [isLoadingMessages, setIsLoadingMessages] = useState(false);
    const [isLoadingAiResponse, setIsLoadingAiResponse] = useState(false);
    const [currentMessage, setCurrentMessage] = useState("");
    const [selectedChat, setSelectedChat] = useState<number>();
    const [chats, setChats] = useState<IChat[]>();
    const _customerData: ICustomerData | undefined =
        useAppSelector(selectCustomerData);
    const [customerData, setCustomerData] = useState<ICustomerData | undefined>(
        _customerData
    );

    useEffect(() => {
        (async () => {
            const newCustomerData = await customerService.getCustomer(
                id as string
            );
            setCustomerData(newCustomerData);
        })();
    }, []);

    const INITIAL_TEXT = `Olá, sou uma Inteligência Artificial conversacional. Fui treinada com os documentos [listados aqui](${routesManager.getSourcesRoute(
        id
    )} 'Knowledge base documents'). Você pode me fazer perguntas ou pedir para produzir textos com base nas informações contidas neles.`;
    const DEFAULT_MESSAGE: IMessage = {
        id: uuidv4(),
        type: "bot",
        date: new Date(),
        text: INITIAL_TEXT,
    };
    const [messageList, setMessageList] = useState<IMessage[]>([
        DEFAULT_MESSAGE,
    ]);

    // Scrolls to bottom every time messageList or isLoadingAiResponse is modified
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messageList, isLoadingAiResponse]);

    // Delete chat
    const handleDelete = async ({ sessionId }: { sessionId: number }) => {
        if (!confirm("Are you sure you'd like to delete this chat?")) return;
        if (!chats) return;
        setChats(prevChatList => {
            if (!prevChatList) return [];
            return prevChatList.filter(item => item.id !== sessionId);
        });
        const success = await chatService.deleteChat({
            projectId,
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
        const newChat = await chatService.createNewChat({
            projectId,
        });
        setChats(prevChatList => {
            if (!prevChatList) return [];
            return [
                {
                    id: newChat.id,
                    date: newChat.created_at,
                    isSelected: true,
                    subtitle: undefined,
                    title: newChat.title,
                },
                ...prevChatList,
            ];
        });
        setSelectedChat(newChat.id);
    };

    // Initial load of chats
    useEffect(() => {
        (async () => {
            const conversations = await chatService.listChats({
                projectId,
            });
            conversations.reverse();
            setChats(
                conversations.map(item => ({
                    id: item.id,
                    email: item.email,
                    title: "AI Bot",
                    subtitle: undefined,
                    date: item.created_at,
                    isSelected: false,
                    onClick: handleSelectChat,
                    onDelete: handleDelete,
                }))
            );
        })();
    }, []);

    // Store selected chat session id
    const handleSelectChat = ({ sessionId }: { sessionId: number }) => {
        setSelectedChat(sessionId);
    };

    // Runs when a new chat is selected, updates the selected chat
    useEffect(() => {
        (async () => {
            if (!selectedChat) {
                return;
            }
            setChats(prevList => {
                if (!prevList) return [];
                const newValue = prevList.map(item => {
                    return {
                        ...item,
                        isSelected: item.id === selectedChat,
                    };
                });
                return newValue;
            });
            setIsLoadingMessages(true);
            const chat = await chatService.retrieveChat({
                projectId,
                sessionId: selectedChat,
            });
            const messages: IMessage[] = [DEFAULT_MESSAGE];
            chat.conversation.forEach(item => {
                messages.push({
                    id: item.date_time,
                    type: "user",
                    date: new Date(item.date_time),
                    text: item.user_query,
                });
                messages.push({
                    id: item.date_time,
                    type: "bot",
                    date: new Date(item.date_time),
                    text: item.ai_response,
                });
            });
            setIsLoadingMessages(false);
            setMessageList(messages);
        })();
    }, [selectedChat]);

    // Send message when Enter is pressed
    const handleEnterPressed = (event: React.KeyboardEvent<Element>) => {
        if (
            event.key === "Enter" &&
            !event.shiftKey &&
            currentMessage.trim() !== ""
        ) {
            handleSendMessage();
        } else if (event.key === "Enter" && event.shiftKey) {
            setCurrentMessage(prevMessage => prevMessage + "\n");
        }
    };

    // Keep track of the state
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (
            (e.nativeEvent as unknown as { inputType: string }).inputType ===
            "insertLineBreak"
        )
            return;
        let text = e.target.value;
        if (
            (e.nativeEvent as unknown as { inputType: string }).inputType ===
            "insertFromPaste"
        ) {
            text = text.trim();
        }
        setCurrentMessage(text);
    };

    // Send message
    const handleSendMessage = async () => {
        if (
            !selectedChat ||
            currentMessage === "" ||
            isLoadingAiResponse ||
            isLoadingMessages
        ) {
            return;
        }
        setIsLoadingAiResponse(true);
        const newUserMessage: IMessage = {
            id: uuidv4(),
            type: "user",
            date: new Date(),
            text: currentMessage,
        };
        const newAiResponse: IMessage = {
            id: uuidv4(),
            type: "bot",
            date: new Date(),
            text: "",
        };
        setCurrentMessage("");
        setMessageList(prevMessageList => [
            ...prevMessageList,
            newUserMessage,
            newAiResponse,
        ]);
        await chatService.sendMessageStream({
            prompt: currentMessage,
            projectId,
            sessionId: selectedChat,
            callback(data) {
                setMessageList(prevMessageList => {
                    const lastMessage =
                        prevMessageList[prevMessageList.length - 1];
                    if (lastMessage.type === "bot") {
                        lastMessage.text += data;
                    }
                    return [...prevMessageList];
                });
            },
        });
        setIsLoadingAiResponse(false);
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
                <LeftTopBar
                    customerData={customerData}
                    handleNewChat={handleNewChat}
                />
                <Box sx={{ overflowY: "scroll" }} height="100%">
                    {chats === undefined ? (
                        <Box display="flex" justifyContent="center" pt={3}>
                            <CircularProgress
                                sx={{ color: customerData?.main_color }}
                            />
                        </Box>
                    ) : chats.length === 0 ? (
                        <Box
                            width="100%"
                            pt={2}
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                        >
                            <Typography color="#555">
                                You do not have any chats yet.
                            </Typography>
                            <Typography color="#555">
                                Create a new one above 👆🏻
                            </Typography>
                        </Box>
                    ) : (
                        <ChatList
                            customerData={customerData}
                            chats={chats}
                            handleDelete={handleDelete}
                            handleSelectChat={handleSelectChat}
                            title="AI Bot"
                        />
                    )}
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
                            customerData={customerData}
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
