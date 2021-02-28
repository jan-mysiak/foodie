import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { categoriesReducer, colorsReducer, groceriesReducer, productsReducer, uiReducer, userReducer } from './reducers/';

const rootReducer = combineReducers({
    ui: uiReducer,
    user: userReducer,
    groceries: groceriesReducer,
    products: productsReducer,
    categories: categoriesReducer,
    colors: colorsReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;