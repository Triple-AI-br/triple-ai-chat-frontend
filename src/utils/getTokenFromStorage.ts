const ACCESS_TOKEN_KEY = "jwt";

export const getAccessTokenFromStorage = () => {
  let token = undefined;
  token = localStorage.getItem(ACCESS_TOKEN_KEY);
  if (!token) {
    token = sessionStorage.getItem(ACCESS_TOKEN_KEY);
  }
  return token;
};
