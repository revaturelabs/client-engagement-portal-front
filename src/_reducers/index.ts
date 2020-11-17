import { AnyAction, CombinedState, combineReducers, Reducer } from "redux";
import { INotificationState, notificationReducer } from "./NotificationReducer";
import { IUserState, userReducer } from "./UserReducer";

export interface IRootState{
    userState:IUserState
    notificationState:INotificationState
}

export const rootReducer:Reducer<CombinedState<IRootState>, AnyAction> = combineReducers<IRootState>({
    userState: userReducer,
    notificationState: notificationReducer
});