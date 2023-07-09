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

interface ICreateConversation {
    data: IConversation;
    status: string;
}

interface ISendMessageResponse {
    data: IMessage;
    status: string;
}

interface IListConversationsResponse {
    data: {
        current_page: 1;
        data: IConversation[];
        first_page_url: string;
        from: number;
        last_page: number;
        last_page_url: string;
        next_page_url: string;
        path: string;
        per_page: number;
        prev_page_url: string;
        to: number;
        total: number;
    };
    status: "success";
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
    sessionId: string;
    accessToken: string;
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
    accessToken: string;
}): Promise<IConversation[]> => {
    const url = `/projects/${projectId}/chats`;
    const response = await api.get(url);
    const data: IListConversationsResponse = response.data;
    return data.data.data;
};

const sendMessage = async ({
    prompt,
    sessionId,
    projectId,
}: {
    prompt: string;
    sessionId: string;
    projectId: number;
    accessToken: string;
}): Promise<IMessage> => {
    const url = `/projects/${projectId}/chats/${sessionId}`;
    const response = await api.post(url, { prompt });
    const data: ISendMessageResponse = response.data;
    return data.data;
};

const createNewChat = async ({
    projectId,
}: {
    projectId: number;
    accessToken: string;
}): Promise<IConversation> => {
    const url = `/projects/${projectId}/chats`;
    const response = await api.post(url, { name: "Timenow AI" });
    const data: ICreateConversation = response.data;
    return data.data;
};

const retrieveChat = async ({
    projectId,
    sessionId,
}: {
    projectId: number;
    sessionId: string;
    accessToken: string;
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
