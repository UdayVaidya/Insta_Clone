import axios from "axios";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api/posts`,
    withCredentials: true
});


export const getFeed = async () => {
    try {
        const response = await api.get("/feed");
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const likePost = async (postId) => {
    try {
        const response = await api.post(`/${postId}/like`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const unlikePost = async (postId) => {
    try {
        const response = await api.post(`/${postId}/unlike`);
        return response.data;
    } catch (error) {
        throw error;
    }
}