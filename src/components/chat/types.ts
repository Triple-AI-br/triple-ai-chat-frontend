export interface IChat {
    id: number;
    email?: string;
    title: string;
    subtitle: string;
    date: string;
    isSelected: boolean;
}

export interface IMessage {
    id: number | string;
    date_time: string;
    type: "user" | "bot";
    text: string;
    references?: string[];
}
