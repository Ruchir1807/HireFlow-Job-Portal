import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:3000/api/applications"
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export const submitApplication = async (applicationData) => {
    const response = await API.post("/", applicationData);
    return response.data;
};

export const getMyApplications = async () => {
    const response = await API.get("/my");
    return response.data;
};