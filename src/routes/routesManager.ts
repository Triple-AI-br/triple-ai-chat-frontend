const getChatsRoute = (): string => "/chats";
const getLandingRoute = (): string => "/";
const getLoginRoute = (): string => "/login";
const getSourcesRoute = (): string => "/sources";
const getConfirmEmailRoute = (): string => "/confirm-email";
const getAcceptInvitationRoute = (): string => "/accept-invitation";
const getChatRoute = (id?: number): string => {
    if (id) return `/chat/${id}`;
    return "/chat/:id";
};

export const routesManager = {
    getChatsRoute,
    getChatRoute,
    getLandingRoute,
    getLoginRoute,
    getSourcesRoute,
    getConfirmEmailRoute,
    getAcceptInvitationRoute,
};
