const CUSTOM_GPT_API_KEY = process.env.REACT_APP_CUSTOM_GPT_API_KEY as string;

if (!CUSTOM_GPT_API_KEY) {
    console.error("Missing API Key");
}

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
    citations: string[];
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
    const url = `https://app.customgpt.ai/api/v1/projects/${projectId}/conversations/${sessionId}`;
    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${CUSTOM_GPT_API_KEY}`,
        },
        method: "DELETE",
    });
    const data: IDeleteChatResponse = await response.json();
    return data.status === "success";
};

const listChats = async ({
    projectId,
}: {
    projectId: number;
}): Promise<IConversation[]> => {
    const url = `https://app.customgpt.ai/api/v1/projects/${projectId}/conversations`;
    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${CUSTOM_GPT_API_KEY}`,
        },
        method: "GET",
    });
    const data: IListConversationsResponse = await response.json();
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
    const url = `https://app.customgpt.ai/api/v1/projects/${projectId}/conversations/${sessionId}/messages?stream=false&lang=pt`;
    const response = await fetch(url, {
        body: JSON.stringify({ prompt }),
        headers: {
            Authorization: `Bearer ${CUSTOM_GPT_API_KEY}`,
            "Content-Type": "application/json",
        },
        method: "POST",
    });
    const data: ISendMessageResponse = await response.json();
    return data.data;
};

const createNewChat = async ({
    projectId,
}: {
    projectId: number;
}): Promise<IConversation> => {
    const url = `https://app.customgpt.ai/api/v1/projects/${projectId}/conversations`;
    const response = await fetch(url, {
        body: JSON.stringify({ name: "Timenow AI" }),
        headers: {
            Authorization: `Bearer ${CUSTOM_GPT_API_KEY}`,
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        method: "POST",
    });
    const data: ICreateConversation = await response.json();
    return data.data;
};

const retrieveChat = async ({
    projectId,
    sessionId,
}: {
    projectId: number;
    sessionId: string;
}): Promise<IMessage[]> => {
    const url = `https://app.customgpt.ai/api/v1/projects/${projectId}/conversations/${sessionId}/messages?page=1&order=desc`;
    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${CUSTOM_GPT_API_KEY}`,
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        method: "GET",
    });
    const data: IRetrieveConversationResponse = await response.json();
    return data.data.messages.data;
};

export const chatManager = {
    listChats,
    sendMessage,
    createNewChat,
    retrieveChat,
    deleteChat,
};
