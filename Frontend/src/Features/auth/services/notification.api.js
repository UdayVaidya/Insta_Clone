import axios from "axios";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api/notifications`,
    withCredentials: true
});

export const getNotifications = async () => {
    const response = await api.get("/");
    return response.data;
};
