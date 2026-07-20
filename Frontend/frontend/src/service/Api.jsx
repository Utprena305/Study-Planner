import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api",
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

export default API;