import { useEffect, useRef, useState } from "react";
import { chatService, projectService } from "../../services";
import { v4 as uuidv4 } from "uuid";
import { Spinner } from "../../components/loaders";
import {
  ChatBar,
  ChatList,
  LeftTopBar,
  MessageList,
  IChat,
  IMessage,
  TextChat,
} from "../../components/chat";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { routesManager } from "../../routes/routesManager";
import { ICustomerData, selectCustomerData, selectUserData } from "../../redux/authenticationSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { actionDisplayNotification } from "../../redux/notificationSlice";
import { CustomSnackbar } from "../../components/shared";
import { LeftContainer } from "./styled";
import { useTranslation } from "react-i18next";

const GRAY_COLOR = "#f5f5f5";

const ChatPage = () => {
  const { id } = useParams() as { id: string };
  const { t } = useTranslation();
  const projectId = parseInt(id);
  const bottomRef = useRef<HTMLInputElement>(null);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [isLoadingAiResponse, setIsLoadingAiResponse] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const [selectedChat, setSelectedChat] = useState<number>();
  const [chats, setChats] = useState<IChat[]>();
  const [anonymousChats, setAnonymousChats] = useState<IChat[]>();
  const customerData: ICustomerData | undefined | null = useAppSelector(selectCustomerData);
  const userData = useAppSelector(selectUserData);
  const dispatch = useAppDispatch();

  const isAnonymousChat =
    selectedChat && anonymousChats
      ? anonymousChats.map((chat) => chat.id).includes(selectedChat)
      : false;

  const INITIAL_TEXT = t("pages.chat.initialMessage", {
    documents: `[listados aqui](${routesManager.getSourcesRoute(id)} 'Knowledge base documents')`,
  });
  const DEFAULT_MESSAGE: IMessage = {
    id: uuidv4(),
    type: "bot",
    date_time: Date(),
    text: INITIAL_TEXT,
  };
  const [messageList, setMessageList] = useState<IMessage[]>([DEFAULT_MESSAGE]);

  // Scrolls to bottom every time messageList or isLoadingAiResponse is modified
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageList, isLoadingAiResponse]);

  // Delete chat
  const handleDelete = async ({ sessionId }: { sessionId: number }) => {
    if (!confirm(t("pages.chat.components.notifications.deleteConfirmation"))) return;
    if (!chats) return;
    setChats((prevChatList) => {
      if (!prevChatList) return [];
      return prevChatList.filter((item) => item.id !== sessionId);
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
    setChats((prevChatList) => {
      if (!prevChatList) return [];
      return [
        {
          id: newChat.id,
          date: newChat.created_at,
          isSelected: true,
          subtitle: t("pages.chat.components.newChatBtn"),
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
      try {
        const conversations = await chatService.listChats({
          projectId,
        });
        conversations.reverse();
        setChats(
          conversations.map((item) => ({
            id: item.id,
            email: item.user?.email,
            title: "AI Bot",
            subtitle: item.title,
            date: item.created_at,
            isSelected: false,
            onClick: handleSelectChat,
            onDelete: handleDelete,
          })),
        );
      } catch (err) {
        dispatch(
          actionDisplayNotification({
            messages: [t("pages.chat.components.notifications.failureRequestChats")],
            severity: "warning",
          }),
        );
      }

      // Chamada de chats anônimos não precisa depender da chamada de chats do projeto e vice versa.
      try {
        const project = await projectService.getProject(projectId);
        // Apenas Admin, SuperUser e o dono do projeto podem ver os chats anonimos do projeto
        if (
          project.user_owner.id !== userData?.id &&
          !userData?.is_admin &&
          !userData?.is_superuser
        ) {
          return;
        }

        const anonymousConversations = await chatService.listAnonymousChats({ projectId });
        setAnonymousChats(
          anonymousConversations.map((item) => ({
            id: item.id,
            email: item.user?.email,
            title: "AI Bot",
            subtitle: item.title,
            date: item.created_at,
            isSelected: false,
            onClick: handleSelectChat,
            onDelete: handleDelete,
          })),
        );
      } catch (err) {
        dispatch(
          actionDisplayNotification({
            messages: [t("pages.chat.components.notifications.failureRequestAnonymousChats")],
            severity: "warning",
          }),
        );
      }
    })();
  }, []);

  // Store selected chat session id
  const handleSelectChat = ({ sessionId }: { sessionId: number }) => {
    if (isLoadingAiResponse) {
      dispatch(
        actionDisplayNotification({
          messages: [t("pages.chat.components.notifications.waitForAIReponseToQuitChat")],
        }),
      );
      return;
    }

    setSelectedChat(sessionId);
  };

  // Runs when a new chat is selected, updates the selected chat
  useEffect(() => {
    (async () => {
      if (!selectedChat) {
        return;
      }
      if (isAnonymousChat) {
        setAnonymousChats((prevList) => {
          if (!prevList) return [];
          const newValue = prevList.map((item) => {
            return {
              ...item,
              isSelected: item.id === selectedChat,
            };
          });
          return newValue;
        });
      } else {
        setChats((prevList) => {
          if (!prevList) return [];
          const newValue = prevList.map((item) => {
            return {
              ...item,
              isSelected: item.id === selectedChat,
            };
          });
          return newValue;
        });
      }
      setIsLoadingMessages(true);
      let chat;
      if (isAnonymousChat) {
        chat = await chatService.getAnonymousChat({
          projectId,
          sessionId: selectedChat,
        });
      } else {
        chat = await chatService.retrieveChat({
          projectId,
          sessionId: selectedChat,
        });
      }
      const messages: IMessage[] = [DEFAULT_MESSAGE];
      chat.conversation.forEach((item) => {
        messages.push({
          id: item.date_time,
          type: "user",
          date_time: item.date_time,
          text: item.user_query,
        });
        messages.push({
          id: item.date_time,
          type: "bot",
          date_time: item.date_time,
          text: item.ai_response,
          references: item.references,
        });
      });
      setIsLoadingMessages(false);
      setMessageList(messages);
    })();
  }, [selectedChat]);

  // Send message when Enter is pressed
  const handleEnterPressed = (event: React.KeyboardEvent<Element>) => {
    if (event.key === "Enter" && !event.shiftKey && currentMessage.trim() !== "") {
      handleSendMessage();
    } else if (event.key === "Enter" && event.shiftKey) {
      setCurrentMessage((prevMessage) => prevMessage + "\n");
    }
  };

  // Keep track of the state
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if ((e.nativeEvent as unknown as { inputType: string }).inputType === "insertLineBreak") return;
    let text = e.target.value;
    if ((e.nativeEvent as unknown as { inputType: string }).inputType === "insertFromPaste") {
      text = text.trim();
    }
    setCurrentMessage(text);
  };

  // Send message
  const handleSendMessage = async () => {
    if (!selectedChat || currentMessage === "" || isLoadingAiResponse || isLoadingMessages) {
      dispatch(
        actionDisplayNotification({
          messages: [t("pages.chat.components.notifications.waitForAIResponseToSend")],
        }),
      );
      return;
    }
    setIsLoadingAiResponse(true);
    const newUserMessage: IMessage = {
      id: uuidv4(),
      type: "user",
      date_time: Date(),
      text: currentMessage,
    };
    const newAiResponse: IMessage = {
      id: uuidv4(),
      type: "bot",
      date_time: Date(),
      text: "|",
    };
    setCurrentMessage("");
    setMessageList((prevMessageList) => [...prevMessageList, newUserMessage, newAiResponse]);
    try {
      await chatService.sendMessageStream({
        prompt: currentMessage,
        projectId,
        sessionId: selectedChat,
        callback(data) {
          setMessageList((prevMessageList) => {
            const lastMessage = prevMessageList[prevMessageList.length - 1];
            if (data.references) {
              lastMessage.references = data.references;
            }
            if (data.finish_reason) {
              lastMessage.text = lastMessage.text.slice(0, -1);
              return [...prevMessageList];
            } else {
              lastMessage.text = lastMessage.text.slice(0, -1) + data.delta + "|";
              return [...prevMessageList];
            }
          });
        },
      });
    } catch (error) {
      setMessageList((prevMessageList) => prevMessageList.slice(0, -2));
      dispatch(
        actionDisplayNotification({
          messages: [(error as { message: string }).message],
        }),
      );
    }
    setIsLoadingAiResponse(false);
  };

  return (
    // Main container
    <Box sx={{ display: "flex", height: "100vh" }}>
      <CustomSnackbar />
      {/* Left column container */}
      <LeftContainer>
        <LeftTopBar customerData={customerData} handleNewChat={handleNewChat} />
        <Box sx={{ overflowY: "scroll" }} height="100%">
          {chats === undefined ? (
            <Box display="flex" justifyContent="center" pt={3}>
              <CircularProgress sx={{ color: customerData?.main_color }} />
            </Box>
          ) : chats.length === 0 ? (
            <Box width="100%" pt={2} display="flex" flexDirection="column" alignItems="center">
              <Typography color="#555">{t("pages.chat.noChats")}</Typography>
              <Typography color="#555">{t("pages.chat.createChats")}</Typography>
            </Box>
          ) : (
            <ChatList
              customerData={customerData}
              chats={chats}
              anonymousChats={anonymousChats}
              handleDelete={handleDelete}
              handleSelectChat={handleSelectChat}
            />
          )}
        </Box>
      </LeftContainer>

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
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
              <Spinner />
            </Box>
          ) : selectedChat ? (
            <Box display="flex" flexDirection="column" height="100%" sx={{ overflowY: "scroll" }}>
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
                {t("pages.chat.selectAChat")}
              </Typography>
            </Box>
          )}
          {selectedChat && !isLoadingMessages && !isAnonymousChat && (
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
