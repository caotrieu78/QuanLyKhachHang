const USER_PATH = "/user";
const CUSTOMER_PATH = "/customer";
const PROJECT_PATH = "/project";
const PROJECT_TYPES_PATH = "/project-types";
const EVENT_PATH = "/event";
const EVENT_TYPES_PATH = "/event-types"
const REMAIND_PATH = "/remainder";
const PAYMENT_PATH = "/payment";

export const PATHS = {
    // Authentication
    LOGIN: "/login",
    HOME: "/",

    // User Management
    USER: USER_PATH,
    ADD_USER: `${USER_PATH}/addUser`,
    EDIT_USER: `${USER_PATH}/editUser`,

    // Customer Management
    CUSTOMER: CUSTOMER_PATH,
    ADD_CUSTOMER: `${CUSTOMER_PATH}/addCustomer`,
    EDIT_CUSTOMER: `${CUSTOMER_PATH}/editCustomer`,


    // Project Management
    PROJECT: PROJECT_PATH,
    ADD_PROJECT: `${PROJECT_PATH}/addProject`,
    EDIT_PROJECT: `${PROJECT_PATH}/editProject`,


    // Project Type
    PROJECT_TYPES: PROJECT_TYPES_PATH,
    ADD_PROJECT_TYPE: `${PROJECT_PATH}/addTypes`,
    EDIT_PROJECT_TYPE: `${PROJECT_PATH}/editTypes`,



    // Event Management
    EVENT: EVENT_PATH,
    ADD_EVENT: `${EVENT_PATH}/addEvent`,
    EDIT_EVENT: `${EVENT_PATH}/editEvents`,

    // Event Type
    EVENT_TYPES: EVENT_TYPES_PATH,
    ADD_EVENT_TYPE: `${EVENT_PATH}/addTypes`,
    EDIT_EVENT_TYPE: `${EVENT_PATH}/editTypes`,

    // Reminder Management
    REMAIND: REMAIND_PATH,

    // Payment Management
    PAYMENT: PAYMENT_PATH,
};
