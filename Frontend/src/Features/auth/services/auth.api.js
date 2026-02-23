import axios from "axios";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api/auth`,
    withCredentials: true
})

export const register = async(username, email, password) => {
    try {
        const response = await api.post("/register", {
            username,
            email,
            password
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const login = async(identifier, password) => {
    try {
        const response = await api.post("/login", {
            identifier,
            password
        });
        return response.data;
    } catch (error) {   
        throw error;
    }
}

export const getMe = async() =>{
    try {
        const response = await api.post("/get-me");
        return response.data;
    } catch (error) {
        throw error;
    }
}




