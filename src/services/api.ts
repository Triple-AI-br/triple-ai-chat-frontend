import axios from "axios";

const BASE_API_URL = process.env.REACT_APP_BASE_API_URL as string;

const accessToken = localStorage.getItem("jwt");

const api = axios.create({
  baseURL: `${BASE_API_URL}/api/v1`,
  headers: { Authorization: `Bearer ${accessToken}` },
});

// Make sure to use latest value of access token upon every request
api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("jwt");
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

export { api };
