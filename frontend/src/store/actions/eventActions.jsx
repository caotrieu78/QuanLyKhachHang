import * as api from "../../services/eventServices"; // Import API service cho sự kiện

// Lấy danh sách sự kiện
export const fetchEvents = () => async (dispatch) => {
    try {
        const events = await api.getAllEvents();
        dispatch({ type: "FETCH_EVENTS_SUCCESS", payload: events });
    } catch (error) {
        dispatch({ type: "EVENT_ERROR", payload: error.message });
    }
};

// Lấy thông tin chi tiết sự kiện theo ID
export const fetchEventById = (id) => async (dispatch) => {
    try {
        const event = await api.getEventById(id);
        dispatch({ type: "FETCH_EVENT_SUCCESS", payload: event });
    } catch (error) {
        dispatch({ type: "EVENT_ERROR", payload: error.message });
    }
};

// Tạo mới sự kiện
export const createEvent = (event) => async (dispatch) => {
    try {
        const newEvent = await api.createEvent(event);
        dispatch({ type: "CREATE_EVENT_SUCCESS", payload: newEvent });
    } catch (error) {
        dispatch({ type: "EVENT_ERROR", payload: error.message });
    }
};

// Cập nhật thông tin sự kiện
export const updateEvent = (id, event) => async (dispatch) => {
    try {
        const updatedEvent = await api.updateEvent(id, event);
        dispatch({ type: "UPDATE_EVENT_SUCCESS", payload: updatedEvent });
    } catch (error) {
        dispatch({ type: "EVENT_ERROR", payload: error.message });
    }
};

// Xóa sự kiện
export const deleteEvent = (id) => async (dispatch) => {
    try {
        await api.deleteEvent(id);
        dispatch({ type: "DELETE_EVENT_SUCCESS", payload: id });
    } catch (error) {
        dispatch({ type: "EVENT_ERROR", payload: error.message });
    }
};
