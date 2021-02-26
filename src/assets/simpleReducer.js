export default function simpleReducer(state, newState) {
    return { ...state, ...newState };
}