const initialState = {
    userId: "",
    userStatus: "",
}

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case "SET_USER_ID":
            return { ...state, userId: action.payload };
        case "SET_USER_STATUS":
            return { ...state, userStatus: action.payload };
        default:
            return state;
    }
}