import axios from "axios";

const BASE_API_URL = process.env.REACT_APP_BASE_API_URL as string;

const accessToken = localStorage.getItem("jwt");

const api = axios.create({
    baseURL: `${BASE_API_URL}/api/v1`,
    headers: { Authorization: `Bearer ${accessToken}` },
});

export { api };
