export interface IChat {
    id: number;
    title: string;
    subtitle?: string;
    date: string;
    isSelected: boolean;
}

export interface IMessage {
    id: number | string;
    date: Date;
    type: "user" | "bot";
    text: string;
}
