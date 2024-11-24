import axios from "axios";
import environments from "../constant/environment";

const API_BASE_URL = environments.apiBaseUrl;

// Event APIs
export const getAllEvents = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/events`);
        return response.data; // Return the list of events
    } catch (error) {
        console.error("Error fetching events:", error);
        throw new Error("Không thể tải danh sách sự kiện.");
    }
};

export const getEventById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/events/${id}`);
        return response.data; // Return the data from the response
    } catch (error) {
        console.error(`Error fetching event with ID ${id}:`, error);
        throw new Error("Không thể tải thông tin sự kiện.");
    }
};

export const createEvent = async (event) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/events`, event);
        return response.data; // Return the created event data
    } catch (error) {
        console.error("Error creating event:", error);
        throw new Error("Không thể tạo sự kiện.");
    }
};

export const updateEvent = async (id, event) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/events/${id}`, event);
        return response.data; // Return the updated event data
    } catch (error) {
        console.error(`Error updating event with ID ${id}:`, error);
        throw new Error("Không thể cập nhật sự kiện.");
    }
};

export const deleteEvent = async (id) => {
    try {
        await axios.delete(`${API_BASE_URL}/events/${id}`);
    } catch (error) {
        console.error(`Error deleting event with ID ${id}:`, error);
        throw new Error("Không thể xóa sự kiện.");
    }
};

// Event Type APIs
export const getAllEventTypes = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/event-types`);
        return response.data; // Return the list of event types
    } catch (error) {
        console.error("Error fetching event types:", error);
        throw new Error("Không thể tải danh sách loại sự kiện.");
    }
};

export const getEventTypeById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/event-types/${id}`);
        return response.data; // Return the event type details
    } catch (error) {
        console.error(`Error fetching event type with ID ${id}:`, error);
        throw new Error("Không thể tải thông tin loại sự kiện.");
    }
};

export const createEventType = async (eventType) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/event-types`, eventType);
        return response.data; // Return the created event type data
    } catch (error) {
        console.error("Error creating event type:", error);
        throw new Error("Không thể tạo loại sự kiện.");
    }
};

export const updateEventType = async (id, eventType) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/event-types/${id}`, eventType);
        return response.data; // Return the updated event type data
    } catch (error) {
        console.error(`Error updating event type with ID ${id}:`, error);
        throw new Error("Không thể cập nhật loại sự kiện.");
    }
};

export const deleteEventType = async (id) => {
    try {
        await axios.delete(`${API_BASE_URL}/event-types/${id}`);
    } catch (error) {
        console.error(`Error deleting event type with ID ${id}:`, error);
        throw new Error("Không thể xóa loại sự kiện.");
    }
};
