export interface IChat {
    id: string;
    title: string;
    subtitle: string;
    date: string;
    isSelected: boolean;
}

export interface IMessage {
    id: number | string;
    date: Date;
    type: "user" | "bot";
    text: string;
}
