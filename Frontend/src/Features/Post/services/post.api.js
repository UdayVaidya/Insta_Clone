import axios from "axios";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api/posts`,
    withCredentials: true
});

export const getFeed = async () => {
    const response = await api.get("/feed");
    return response.data;
};

export const getExplorePosts = async () => {
    const response = await api.get("/explore");
    return response.data;
};

export const getSavedPosts = async () => {
    const response = await api.get("/saved");
    return response.data;
};

export const createPost = async (formData) => {
    const response = await api.post("/", formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });
    return response.data;
};

export const likePost = async (postId) => {
    const response = await api.post(`/${postId}/like`);
    return response.data;
};

export const unlikePost = async (postId) => {
    const response = await api.post(`/${postId}/unlike`);
    return response.data;
};

export const savePost = async (postId) => {
    const response = await api.post(`/${postId}/save`);
    return response.data;
};

export const unsavePost = async (postId) => {
    const response = await api.post(`/${postId}/unsave`);
    return response.data;
};