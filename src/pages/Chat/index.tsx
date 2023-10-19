import { useEffect, useRef, useState } from "react";
import { IProject, chatService, projectService } from "../../services";
import { v4 as uuidv4 } from "uuid";
import { Spinner } from "../../components/loaders";
import { ChatBar, MessageList, IChat, IMessage, TextChat } from "../../components/chat";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { routesManager } from "../../routes/routesManager";
import { ICustomerData, selectCustomerData, selectUserData } from "../../redux/authenticationSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { actionDisplayNotification } from "../../redux/notificationSlice";
import { CustomSnackbar } from "../../components/shared";
import { useTranslation } from "react-i18next";
import { Layout } from "antd";
import { DrawerChat } from "../../components/chat/DrawerChat";
import { Content } from "antd/es/layout/layout";
import { HistoricContainer, MainMessagesContainer } from "./styled";
import { useWindowSize } from "../../utils/useWindowSize";
import { NoChatContent } from "../../components/chat/NoChatContent";
import { TextChatContainer } from "../../components/chat/TextChat/styled";

const DESKTOP_SIZE = 800;

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
  const [project, setProject] = useState<IProject>();
  const [newMessagePrompt, setNewMessagePrompt] = useState<string>();
  const { width } = useWindowSize();

  const isDesktop = width >= DESKTOP_SIZE;
  const [collapsed, setCollapsed] = useState<boolean>(!isDesktop);
  const customerData: ICustomerData | undefined | null = useAppSelector(selectCustomerData);
  const userData = useAppSelector(selectUserData);
  const dispatch = useAppDispatch();

  const isAnonymousChat =
    selectedChat && anonymousChats
      ? anonymousChats.map((chat) => chat.id).includes(selectedChat)
      : false;

  const loadedChat = chats?.find((chat) => chat.id === selectedChat);

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

  // Store selected chat session id
  const handleSelectChat = ({ sessionId }: { sessionId: number }) => {
    if (isLoadingAiResponse) {
      dispatch(
        actionDisplayNotification({
          messages: [t("pages.chat.components.notifications.waitForAIReponseToQuitChat")],
          severity: "warning",
        }),
      );
      return;
    }

    setSelectedChat(sessionId);
  };

  // Send message when Enter is pressed
  const handleEnterPressed = (event: React.KeyboardEvent<Element>) => {
    if (event.key === "Enter" && !event.shiftKey && currentMessage.trim() !== "") {
      handleSendMessage();
    } else if (event.key === "Enter" && event.shiftKey) {
      setCurrentMessage((prevMessage) => prevMessage + "\n");
    }
  };

  // Keep track of the state
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if ((e.nativeEvent as unknown as { inputType: string }).inputType === "insertLineBreak") return;
    let text = e.target.value;
    if ((e.nativeEvent as unknown as { inputType: string }).inputType === "insertFromPaste") {
      text = text.trim();
    }
    setCurrentMessage(text);
  };

  // Send message
  const handleSendMessage = async (prompt?: string) => {
    if (
      !selectedChat ||
      (currentMessage === "" && !prompt) ||
      isLoadingAiResponse ||
      isLoadingMessages
    ) {
      dispatch(
        actionDisplayNotification({
          messages: [t("pages.chat.components.notifications.waitForAIResponseToSend")],
          severity: "warning",
        }),
      );
      return;
    }
    const message = prompt || currentMessage;
    setIsLoadingAiResponse(true);
    const newUserMessage: IMessage = {
      id: uuidv4(),
      type: "user",
      date_time: Date(),
      text: message,
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
        prompt: message,
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

  // Initial load of chats
  useEffect(() => {
    (async () => {
      try {
        const project = await projectService.getProject(projectId);
        setProject(project);

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
    })();
  }, []);

  // Roda quando tiver nova informação do projeto (dependências do objeto do projeto)
  useEffect(() => {
    (async () => {
      try {
        // Apenas Admin, SuperUser e o dono do projeto podem ver os chats anonimos do projeto
        if (
          !project ||
          (project.user_owner.id !== userData?.id && !userData?.is_admin && !userData?.is_superuser)
        ) {
          return;
        }

        const anonymousConversations = await chatService.listAnonymousChats({ projectId });
        anonymousConversations.reverse();
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
      } catch (e) {
        dispatch(
          actionDisplayNotification({
            messages: [t("pages.chat.components.notifications.failureRequestAnonymousChats")],
            severity: "warning",
          }),
        );
      }
    })();
  }, [project]);

  // Runs when a new chat is selected, updates the selected chat
  useEffect(() => {
    (async () => {
      if (!selectedChat) {
        return;
      }
      if (isAnonymousChat) {
        setChats((prevList) => {
          if (!prevList) return [];
          const newValue = prevList.map((item) => {
            return {
              ...item,
              isSelected: false,
            };
          });
          return newValue;
        });
        setAnonymousChats((prevList) => {
          if (!prevList) return undefined;
          if (!prevList.length) return [];
          const newValue = prevList.map((item) => {
            return {
              ...item,
              isSelected: item.id === selectedChat,
            };
          });
          return newValue;
        });
      } else {
        setAnonymousChats((prevList) => {
          if (!prevList) return undefined;
          if (!prevList.length) return [];
          const newValue = prevList.map((item) => {
            return {
              ...item,
              isSelected: false,
            };
          });
          return newValue;
        });
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

  // Scrolls to bottom every time messageList or isLoadingAiResponse is modified
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageList, isLoadingAiResponse]);

  // Check if you are in desktop mode to render the sider
  useEffect(() => {
    if (isDesktop && collapsed) {
      setCollapsed(false);
    }
  }, [isDesktop]);

  //create new chat if user select a prompt
  useEffect(() => {
    if (newMessagePrompt) {
      handleNewChat();
    }
  }, [newMessagePrompt]);

  // Send prompt to new message after loading messages
  useEffect(() => {
    (async () => {
      if (newMessagePrompt && !isLoadingMessages) {
        await handleSendMessage(newMessagePrompt);
        setNewMessagePrompt(undefined);
      }
    })();
  }, [isLoadingMessages]);

  return (
    // Main container
    <Layout style={{ height: "100svh" }}>
      <CustomSnackbar />
      <DrawerChat
        chats={chats}
        customerData={customerData}
        handleNewChat={handleNewChat}
        anonymousChats={anonymousChats}
        handleDelete={handleDelete}
        handleSelectChat={handleSelectChat}
        project={project}
        setCollapsed={setCollapsed}
        collapsed={collapsed}
        isDesktop={isDesktop}
      />

      <Layout style={{ height: "100svh" }}>
        <Content style={{ position: "relative", overflow: "hidden", height: "100%" }}>
          <div
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            {isLoadingMessages ? (
              <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <Spinner />
              </Box>
            ) : selectedChat ? (
              <HistoricContainer>
                <ChatBar
                  loadedChat={loadedChat}
                  project={project}
                  setCollapsed={setCollapsed}
                  isDesktop={isDesktop}
                />
                <MainMessagesContainer>
                  <MessageList messages={messageList} />
                  <div ref={bottomRef} />
                </MainMessagesContainer>
              </HistoricContainer>
            ) : (
              <NoChatContent
                setNewMessagePrompt={setNewMessagePrompt}
                project={project}
                setCollapsed={setCollapsed}
                isDesktop={isDesktop}
              />
            )}
          </div>

          <TextChatContainer />
          {!isLoadingMessages && selectedChat && !isAnonymousChat ? (
            <TextChat
              customerData={customerData}
              currentMessage={currentMessage}
              handleChange={handleChange}
              handleEnterPressed={handleEnterPressed}
              handleSendMessage={handleSendMessage}
            />
          ) : null}
        </Content>
      </Layout>
    </Layout>
  );
};

export { ChatPage };
