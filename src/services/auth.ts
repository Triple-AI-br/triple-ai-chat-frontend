import { api } from "./api";

interface IConfirmEmailResponse {
    success: boolean;
    detail: string;
}

interface IInviteUsersResponse {
    success: boolean;
    failed: Record<string, string>;
    invited: string[];
}

const requestPasswordReset = async (
	email: string
): Promise<{ detail: string }> => {
	const url = "/login/password-recovery";
	const response = await api.post(url, { email });
	const data = response.data;
	return data;
};

const confirmEmail = async (token: string): Promise<IConfirmEmailResponse> => {
	const url = "/login/confirm-email";
	const response = await api.post(url, token);
	const data: IConfirmEmailResponse = response.data;
	return data;
};

const inviteUsers = async (emails: string[]): Promise<IInviteUsersResponse> => {
	const url = "/users/invite";
	const response = await api.post(url, { emails });
	const data: IInviteUsersResponse = response.data;
	return data;
};

export const authService = {
	confirmEmail,
	inviteUsers,
	requestPasswordReset,
};
