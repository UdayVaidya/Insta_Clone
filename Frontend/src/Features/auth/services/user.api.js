import axios from "axios";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api/users`,
    withCredentials: true
});

export const getSuggestedUsers = async () => {
    const response = await api.get("/suggested");
    return response.data;
};

export const getUserProfile = async (username) => {
    const response = await api.get(`/${username}`);
    return response.data;
};

export const followUser = async (username) => {
    const response = await api.post(`/${username}/follow`);
    return response.data;
};

export const unfollowUser = async (username) => {
    const response = await api.post(`/${username}/unfollow`);
    return response.data;
};
