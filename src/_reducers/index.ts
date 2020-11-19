import { AnyAction, CombinedState, combineReducers, Reducer } from "redux";
import { IUserState, userReducer } from "./UserReducer";
import { loginReducer } from "./LoginReducer";

export interface IRootState {
    userState: IUserState;
    //batchState:IBatchState
    roleState: string | null;
}

export const rootReducer: Reducer<
    CombinedState<IRootState>,
    AnyAction
> = combineReducers<IRootState>({
    userState: userReducer,
    roleState: loginReducer,
});
