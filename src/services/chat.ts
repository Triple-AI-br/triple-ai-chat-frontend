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
}): Promise<boolean> => {
    const url = `/api/v1/projects/${projectId}/chats/${sessionId}`;
    const response = await api.delete(url);
    const data: IDeleteChatResponse = response.body;
    return data.status === "success";
};

const listChats = async ({
    projectId,
}: {
    projectId: number;
}): Promise<IConversation[]> => {
    const url = `/api/v1/projects/${projectId}/chats`;
    const response = await api.get(url);
    if (!response.ok) {
        throw new Error(response.body.message);
    }
    const data: IListConversationsResponse = response.body;
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
}): Promise<IMessage> => {
    const url = `/api/v1/projects/${projectId}/chats/${sessionId}`;
    const response = await api.post(
        url,
        { prompt }
        // { headers: { "Access-Control-Allow-Origin": "http://localhost:3000" } }
    );
    if (!response.ok) {
        throw new Error(response.body.message);
    }
    const data: ISendMessageResponse = response.body;
    return data.data;
};

const createNewChat = async ({
    projectId,
}: {
    projectId: number;
}): Promise<IConversation> => {
    const url = `/api/v1/projects/${projectId}/chats`;
    const response = await api.post(url, { name: "Timenow AI" });
    const data: ICreateConversation = response.body;
    return data.data;
};

const retrieveChat = async ({
    projectId,
    sessionId,
}: {
    projectId: number;
    sessionId: string;
}): Promise<IMessage[]> => {
    const url = `/api/v1/projects/${projectId}/chats/${sessionId}`;
    const response = await api.get(url);
    const data: IRetrieveConversationResponse = response.body;
    return data.data.messages.data;
};

export const chatManager = {
    listChats,
    sendMessage,
    createNewChat,
    retrieveChat,
    deleteChat,
};
