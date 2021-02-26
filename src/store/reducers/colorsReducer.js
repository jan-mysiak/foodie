const initialState = {
    availableColors: [],
    colorsStatus: "INIT"
}

export default function colorsReducer(state = initialState, action) {
    switch (action.type) {
        case "SET_AVAILABLE_COLORS":
            return { ...state, availableColors: action.payload };
        case "ADD_AVAILABLE_COLOR":
            return { ...state, availableColors: [action.payload, ...state.availableColors] };
        case "DELETE_AVAILABLE_COLOR":
            return { ...state, availableColors: state.availableColors.filter(g => g.id !== action.payload) };
        case "SET_COLORS_STATUS":
            return { ...state, availableColorsStatus: action.payload };
        default:
            return state;
    }
}