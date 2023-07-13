import { api } from "./api";

interface ITimestamped {
    id: number;
    created_at: string;
    updated_at: string;
}

interface IRetrieveConversationResponse {
    data: {
        conversation: IConversation;
        messages: { data: IMessage[] };
    };
}

export interface IConversation extends ITimestamped {
    session_id: string;
    project_id: number;
    created_by: number;
    name: string;
}

interface IMessage extends ITimestamped {
    user_id: number;
    user_query: string;
    openai_response: string;
    citations: string[] | null;
}

interface IChat {
    project_id: number;
    user_id: number;
    title: string;
    id: number;
    created_at: string;
}

interface ISendMessageResponse {
    data: IMessage;
    status: string;
}

interface IDeleteChatResponse {
    data: {
        deleted: boolean;
    };
    status: string;
}

const deleteChat = async ({
    projectId,
    sessionId,
}: {
    projectId: number;
    sessionId: number;
}): Promise<boolean> => {
    const url = `/projects/${projectId}/chats/${sessionId}`;
    const response = await api.delete(url);
    const data: IDeleteChatResponse = response.data;
    return data.status === "success";
};

const listChats = async ({
    projectId,
}: {
    projectId: number;
}): Promise<IChat[]> => {
    const url = `/projects/${projectId}/chats`;
    const response = await api.get(url);
    return response.data;
};

const sendMessage = async ({
    prompt,
    sessionId,
    projectId,
}: {
    prompt: string;
    sessionId: number;
    projectId: number;
}): Promise<IMessage> => {
    const url = `/projects/${projectId}/chats/${sessionId}`;
    const response = await api.post(url, { prompt }, { timeout: 60_000 });
    const data: ISendMessageResponse = response.data;
    return data.data;
};

const createNewChat = async ({
    projectId,
}: {
    projectId: number;
}): Promise<IChat> => {
    const url = `/projects/${projectId}/chats`;
    const response = await api.post(url, { name: "Timenow AI" });
    const data: IChat = response.data;
    return data;
};

const retrieveChat = async ({
    projectId,
    sessionId,
}: {
    projectId: number;
    sessionId: number;
}): Promise<IMessage[]> => {
    const url = `/projects/${projectId}/chats/${sessionId}`;
    const response = await api.get(url);
    const data: IRetrieveConversationResponse = response.data;
    return data.data.messages.data;
};

export const chatService = {
    listChats,
    sendMessage,
    createNewChat,
    retrieveChat,
    deleteChat,
};
