import { fetchEventSource } from "@microsoft/fetch-event-source";
import { api } from "./api";

interface ITimestamped {
    id: number;
    created_at: string;
    updated_at: string;
}

export interface IConversation extends ITimestamped {
    session_id: string;
    project_id: number;
    created_by: number;
    name: string;
}

interface IMessage {
    user_query: string;
    ai_response: string;
    date_time: string;
    references: string[];
}

interface IChatList {
    project_id: number;
    email?: string;
    user_id: number;
    title: string;
    id: number;
    created_at: string;
}
interface IChatDetail extends IChatList {
    conversation: IMessage[];
}

interface IDeleteChatResponse {
    success: boolean;
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
    return data.success || false;
};

const listChats = async ({
    projectId,
}: {
    projectId: number;
}): Promise<IChatList[]> => {
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
}): Promise<IChatDetail> => {
    const url = `/projects/${projectId}/chats/${sessionId}`;
    const response = await api.post(url, { prompt }, { timeout: 120_000 });
    return response.data;
};

const sendMessageStream = async ({
    prompt,
    callback,
    sessionId,
    projectId,
}: {
    prompt: string;
    callback(_: string): void;
    sessionId: number;
    projectId: number;
}) => {
    const url = `${api.defaults.baseURL}/projects/${projectId}/chats/${sessionId}/stream`;
    // View package documentation: https://www.npmjs.com/package/@microsoft/fetch-event-source
    fetchEventSource(url, {
        openWhenHidden: true, // Needed to keep the connection alive when the user switches tabs
        async onopen(response) {
            if (response.ok) {
                return; // everything's good
            } else {
                throw new Error(
                    `Status code: ${response.status} ${response.statusText} ${response.body}`
                );
            }
        },
        onerror(err) {
            // By rethrowing the error we guarantee that the operation will stop
            // Otherwise it'll keep retrying to connect by sending the same request
            throw err;
        },
        onmessage(msg) {
            if (!msg.data) {
                return;
            }
            const data = msg.data as string;
            callback(data);
        },
        method: "POST",
        headers: {
            Authorization: api.defaults.headers.Authorization as string,
            "Content-Type": "application/json", // This is required for the server to parse the body
        },
        body: JSON.stringify({
            prompt,
        }),
    });
};

const createNewChat = async ({
    projectId,
}: {
    projectId: number;
}): Promise<IChatList> => {
    const url = `/projects/${projectId}/chats`;
    const response = await api.post(url, { name: "AI Bot" });
    const data: IChatList = response.data;
    return data;
};

const retrieveChat = async ({
    projectId,
    sessionId,
}: {
    projectId: number;
    sessionId: number;
}): Promise<IChatDetail> => {
    const url = `/projects/${projectId}/chats/${sessionId}`;
    const response = await api.get(url);
    return response.data;
};

export const chatService = {
    listChats,
    sendMessage,
    createNewChat,
    retrieveChat,
    deleteChat,
    sendMessageStream,
};
