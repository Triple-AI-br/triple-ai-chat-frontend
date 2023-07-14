const getProjectsRoute = (): string => "/projects";
const getLandingRoute = (): string => "/";
const getLoginRoute = (): string => "/login";
const getSourcesRoute = (): string => "/sources";
const getConfirmEmailRoute = (): string => "/confirm-email";
const getAcceptInvitationRoute = (): string => "/accept-invitation";
const getAdminRoute = (): string => "/admin";
const getChatRoute = (id?: number): string => {
    if (id) return `/chat/${id}`;
    return "/chat/:id";
};

export const routesManager = {
    getProjectsRoute,
    getChatRoute,
    getLandingRoute,
    getLoginRoute,
    getSourcesRoute,
    getConfirmEmailRoute,
    getAcceptInvitationRoute,
    getAdminRoute,
};
