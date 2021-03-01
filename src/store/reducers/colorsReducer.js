import { IDLE } from "../statusTypes";

const initialState = {
    colors: [],
    colorsStatus: IDLE
}

export default function colorsReducer(state = initialState, action) {
    switch (action.type) {
        case "SET_COLORS":
            return { ...state, colors: action.payload };
        case "ADD_COLOR":
            return { ...state, colors: [action.payload, ...state.colors] };
        case "UPDATE_COLOR":
            return {
                ...state,
                colors: state.colors.map(c =>
                    (c.id === action.payload.id ? Object.assign({}, c, action.payload) : c)
                )
            }
        case "SET_COLORS_STATUS":
            return { ...state, colorsStatus: action.payload };
        default:
            return state;
    }
}