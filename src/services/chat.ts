import { fetchEventSource } from "@microsoft/fetch-event-source";
import { api } from "./api";

interface ITimestamped {
    id: number;
    created_at: string;
    updated_at: string;
}

interface IMessageStreamStart {
    status: "start";
    prompt: string;
}
interface IMessageStreamProgress {
    status: "progress";
    message: string;
}
interface IMessageStreamFinish {
    status: "finish";
    id: number;
    created_at: string;
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

interface IChatApiResponse {
    project_id: number;
    email?: string;
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
}): Promise<IChatApiResponse[]> => {
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
    const response = await api.post(url, { prompt }, { timeout: 120_000 });
    const data: ISendMessageResponse = response.data;
    return data.data;
};

const sendMessageStream = async ({
    prompt,
    callback,
    sessionId,
    projectId,
}: {
    prompt: string;
    callback(
        _: IMessageStreamStart | IMessageStreamProgress | IMessageStreamFinish
    ): void;
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
            const data:
                | IMessageStreamStart
                | IMessageStreamProgress
                | IMessageStreamFinish = JSON.parse(msg.data);
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
}): Promise<IChatApiResponse> => {
    const url = `/projects/${projectId}/chats`;
    const response = await api.post(url, { name: "AI Bot" });
    const data: IChatApiResponse = response.data;
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
    sendMessageStream,
};
