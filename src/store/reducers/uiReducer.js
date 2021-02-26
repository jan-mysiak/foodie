const initialState = {
    menuActive: false,
    formActive: false,
    searchActive: false,
    actionsHeight: 0,
    // Could make this an object with timeout, type, etc..
    // Currently only used to display errors
    notificationMessage: "",
}

export default function uiReducer(state = initialState, action) {
    switch (action.type) {
        case "SET_SEARCH_ACTIVE":
            return { ...state, searchActive: action.payload, formActive: false };
        case "SET_FORM_ACTIVE":
            return { ...state, formActive: action.payload, searchActive: false };
        case "SET_MENU_ACTIVE":
            return { ...state, menuActive: action.payload };
        case "SET_ACTIONS_HEIGHT":
            return { ...state, actionsHeight: action.payload };
        case "SET_NOTIFICATION":
            return { ...state, notificationMessage: action.payload };
        default:
            return state;
    }
}