import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { uiReducer, userReducer } from './reducers/';

const rootReducer = combineReducers({
    ui: uiReducer,
    user: userReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;