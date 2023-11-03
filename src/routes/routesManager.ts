const getProjectsRoute = (): string => "/projects";
const getLandingRoute = (): string => "/";
const getLoginRoute = (): string => "/login";
const getConfirmEmailRoute = (): string => "/confirm-email";
const getAcceptInvitationRoute = (): string => "/accept-invitation";
const getAdminRoute = (): string => "/admin";
const getResetPasswordRoute = (): string => "/reset-password";
const getSuperuserRoute = (): string => "/superuser";
const getPromptsRoute = (): string => "/prompts";
const getSearchRoute = (id?: number): string => {
  if (id) return `/projects/${id}/search`;
  return "/projects/:id/search";
};
const getChatRoute = (id?: number): string => {
  if (id) return `/projects/${id}/chat`;
  return "/projects/:id/chat";
};
const getSourcesRoute = (id?: string | number): string => {
  if (id) return `/projects/${id}/sources`;
  return "/projects/:id/sources";
};
const getContractsRoute = (): string => "/contracts";

const getContractAnalysisRoute = (id?: string | number): string => {
  if (id) return `/contracts/analysis/${id}`;
  return "/contracts/analysis/:id";
};

export const routesManager = {
  getSuperuserRoute,
  getProjectsRoute,
  getPromptsRoute,
  getChatRoute,
  getLandingRoute,
  getLoginRoute,
  getSourcesRoute,
  getConfirmEmailRoute,
  getAcceptInvitationRoute,
  getAdminRoute,
  getResetPasswordRoute,
  getSearchRoute,
  getContractsRoute,
  getContractAnalysisRoute,
};
