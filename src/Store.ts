import { applyMiddleware, compose, createStore, Store } from "redux";
import thunk from "redux-thunk";
import { IRootState, rootReducer } from "./_reducers";

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/**
 * @constant store
 * The Redux store.
 */
export const store:Store<IRootState> = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));