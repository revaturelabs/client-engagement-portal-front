import { AnyAction, CombinedState, combineReducers, Reducer } from "redux";
import { BatchReducer, IBatchState } from "./BatchReducer";
import { INotificationState, notificationReducer } from "./NotificationReducer";
import { IUserState, userReducer } from "./UserReducer";

export interface IRootState{
    userState:IUserState,
    batchState:IBatchState
    notificationState:INotificationState
}

export const rootReducer:Reducer<CombinedState<IRootState>, AnyAction> = combineReducers<IRootState>(
    {userState: userReducer,
    batchState: BatchReducer,
    notificationState: notificationReducer
    //place your state:reducer here
});
