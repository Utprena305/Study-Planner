import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api",
});
API.interceptors.request.use((config) => {

    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});


export const registerUser = (userData) => {
    return API.post("/users/register", userData);
};


export const loginUser = (userData) => {
    return API.post("/users/login", userData);
};

export const forgotPassword = (userData) => {
    return API.put("/users/forgot-password", userData);
};

export const getTasks = () => {
    return API.get("/tasks");
};

export const addTask = (taskData) => {
    return API.post("/tasks/add", taskData);
};

export const updateTask = (id, taskData) => {
    return API.put(`/tasks/update/${id}`, taskData);
};

export const deleteTask = (id) => {
    return API.delete(`/tasks/delete/${id}`);
};

export const getTaskSummary = () => {
    return API.get("/tasks/summary");
};

export const getSchedules = () => {
    return API.get("/schedules");
};

export const addSchedule = (scheduleData) => {
    return API.post("/schedules/add", scheduleData);
};

export const updateSchedule = (id, scheduleData) => {
    return API.put(`/schedules/update/${id}`, scheduleData);
};

export const deleteSchedule = (id) => {
    return API.delete(`/schedules/delete/${id}`);
};

export const updateProfile = (userData) => {
    return API.put("/users/profile", userData);
};

export default API;