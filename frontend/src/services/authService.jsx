import axios from "axios";
import environments from "../constant/environment";


const API_BASE_URL = environments.apiBaseUrl;

export const login = async (username, password) => {
    const response = await axios.post(`${API_BASE_URL}/users/login`, { username, password });
    return response.data; // Ensure response contains user data
};


export const getAllUsers = async () => {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return response.data;
};

export const getUserById = async (id) => {
    const response = await axios.get(`${API_BASE_URL}/users/${id}`);
    return response.data;
};

export const createUser = async (user) => {
    const response = await axios.post(`${API_BASE_URL}/users`, user);
    return response.data;
};


export const updateUser = async (id, user) => {
    const response = await axios.put(`${API_BASE_URL}/users/${id}`, user);
    return response.data;
};

export const deleteUser = async (id) => {
    await axios.delete(`${API_BASE_URL}/users/${id}`);
};


export const getAllDepartments = async () => {
    const response = await axios.get(`${API_BASE_URL}/departments`);
    return response.data;
};


export const getDepartmentById = async (id) => {
    const response = await axios.get(`${API_BASE_URL}/departments/${id}`);
    return response.data;
};


export const createDepartment = async (department) => {
    const response = await axios.post(`${API_BASE_URL}/departments`, department);
    return response.data;
};


export const updateDepartment = async (id, department) => {
    const response = await axios.put(`${API_BASE_URL}/departments/${id}`, department);
    return response.data;
};


export const deleteDepartment = async (id) => {
    await axios.delete(`${API_BASE_URL}/departments/${id}`);
};

