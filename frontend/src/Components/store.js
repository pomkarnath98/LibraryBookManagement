import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import bookReducer from "./Book/reducer";

// const rootReducer = combineReducers({ login: loginReducer, register: registerReducer, gitData:  gitReducer});

let composeEnhancers = compose;

if (process.env.NODE_ENV !== "production") {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;
}

const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = createStore(bookReducer, enhancer);

export default store;