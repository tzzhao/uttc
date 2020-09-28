import {reducers} from "./reducers";
import {INITIAL_STATE} from "./state";
import {createStore} from "redux";

export const store = createStore(reducers, INITIAL_STATE,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
