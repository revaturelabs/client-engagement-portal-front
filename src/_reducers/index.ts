import { AnyAction, CombinedState, combineReducers, Reducer } from "redux";
import { IUserState, userReducer } from "./UserReducer";

export interface IRootState{
    userState:IUserState,
    //batchState:IBatchState
}

export const rootReducer:Reducer<CombinedState<IRootState>, AnyAction> = combineReducers<IRootState>({userState: userReducer});