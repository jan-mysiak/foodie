import { IDLE } from "../statusTypes";

const initialState = {
    categories: [],
    categoriesStatus: IDLE,
}

export default function categoriesReducer(state = initialState, action) {
    switch (action.type) {
        case "SET_CATEGORIES":
            return { ...state, categories: action.payload };
        case "ADD_CATEGORY":
            return { ...state, categories: [action.payload, ...state.categories] };
        case "UPDATE_CATEGORY":
            return {
                ...state,
                categories: state.categories.map(c =>
                    (c.id === action.payload.id ? Object.assign({}, c, action.payload) : c)
                )
            }
        case "DELETE_CATEGORY":
            return { ...state, categories: state.categories.filter(c => c.id !== action.payload) };
        case "SET_CATEGORIES_STATUS":
            return { ...state, categoriesStatus: action.payload };
        default:
            return state;
    }
}