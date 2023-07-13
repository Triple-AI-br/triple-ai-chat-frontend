import { api } from "./api";

interface IConfirmEmailResponse {
    success: boolean;
    detail: string;
}

const confirmEmail = async (token: string): Promise<IConfirmEmailResponse> => {
    const url = "/login/confirm-email";
    const response = await api.post(url, token);
    const data: IConfirmEmailResponse = response.data;
    return data;
};

export const authService = {
    confirmEmail,
};
