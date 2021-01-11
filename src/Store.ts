import { applyMiddleware, compose, createStore, Store } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "./_reducers";
import { Store as StoreType } from './types';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/**
 * @constant store
 * The Redux store.
 */
export const store:Store<StoreType> = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));