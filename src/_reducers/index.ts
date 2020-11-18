import { AnyAction, CombinedState, combineReducers, Reducer } from "redux";
import { IBatchState } from "./BatchReducer";
import { IUserState, userReducer } from "./UserReducer";

export interface IRootState{
    userState:IUserState,
    //batchState:IBatchState
}

export const rootReducer:Reducer<CombinedState<IRootState>, AnyAction> = combineReducers<IRootState>({userState: userReducer});