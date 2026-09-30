
import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:3000/api/auth"
});

// Register a new user
export const registerUser = async (userData) => {
    const response = await API.post("/register", userData);
    return response.data;
};

// Login an existing user
export const loginUser = async (userData) => {
    const response = await API.post("/login", userData);
    return response.data;
};