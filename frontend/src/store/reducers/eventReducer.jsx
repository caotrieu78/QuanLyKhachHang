const initialState = {
    events: [], // Danh sách sự kiện
    currentEvent: null, // Sự kiện hiện tại (chi tiết)
    error: null, // Thông báo lỗi
};

const eventReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_EVENTS_SUCCESS":
            return { ...state, events: action.payload, error: null };
        case "FETCH_EVENT_SUCCESS":
            return { ...state, currentEvent: action.payload, error: null };
        case "CREATE_EVENT_SUCCESS":
            return { ...state, events: [...state.events, action.payload], error: null };
        case "UPDATE_EVENT_SUCCESS":
            return {
                ...state,
                events: state.events.map((event) =>
                    event.eventId === action.payload.eventId ? action.payload : event
                ),
                error: null,
            };
        case "DELETE_EVENT_SUCCESS":
            return {
                ...state,
                events: state.events.filter(
                    (event) => event.eventId !== action.payload
                ),
                error: null,
            };
        case "EVENT_ERROR":
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

export default eventReducer;
