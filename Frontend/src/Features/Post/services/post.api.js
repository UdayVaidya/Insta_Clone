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