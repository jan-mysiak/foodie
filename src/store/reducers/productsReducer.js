const initialState = {
    products: [],
    productsStatus: "INIT"
}

export default function productsReducer(state = initialState, action) {
    switch (action.type) {
        case "SET_PRODUCTS":
            return { ...state, products: action.payload };
        case "ADD_PRODUCT":
            return { ...state, products: [action.payload, ...state.products] };
        case "DELETE_PRODUCT":
            return { ...state, products: state.products.filter(g => g.id !== action.payload) };
        case "SET_PRODUCTS_STATUS":
            return { ...state, productsStatus: action.payload };
        default:
            return state;
    }
}