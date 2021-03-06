import { IDLE } from "../statusTypes";

const initialState = {
    groceries: [],
    groceriesStatus: IDLE
}

export default function groceriesReducer(state = initialState, action) {
    switch (action.type) {
        case "SET_GROCERIES":
            return { ...state, groceries: action.payload };
        case "ADD_GROCERY":
            return { ...state, groceries: [action.payload, ...state.groceries] };
        case "DELETE_GROCERY":
            return { ...state, groceries: state.groceries.filter(g => g.id !== action.payload) };
        case "SET_GROCERIES_STATUS":
            return { ...state, groceriesStatus: action.payload };
        default:
            return state;
    }
}