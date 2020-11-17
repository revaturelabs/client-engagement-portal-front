import { AnyAction, CombinedState, combineReducers, Reducer } from "redux";
import { IUserState, userReducer } from "./UserReducer";

export interface IRootState{
    userState:IUserState
}

export const rootReducer:Reducer<CombinedState<IRootState>, AnyAction> = combineReducers<IRootState>({userState: userReducer});