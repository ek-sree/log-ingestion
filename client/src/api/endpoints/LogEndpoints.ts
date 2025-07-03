const BASE_URL = import.meta.env.VITE_API_URL;

export const LOG_ENDPOINTS = {
    POST_LOGS: `${BASE_URL}/logs/post-logs`,
    GET_LOGS: `${BASE_URL}/logs/get-logs`,
};
