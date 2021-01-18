import { CombinedState, combineReducers, Reducer } from "redux";
import { BatchReducer, IBatchState } from "./BatchReducer";
import { IMessageState, messageReducer} from "./MessagesReducer";
import { INotificationState, notificationReducer } from "./NotificationReducer";
import { IUserState, userReducer } from "./UserReducer";


export interface IRootState {
    messageState: IMessageState;
    userState: IUserState,
    batchState: IBatchState,
    notificationState: INotificationState
}

/**
 * Combined reducer to be stored in the Redux store for state handling.
 */
export const rootReducer: Reducer<CombinedState<IRootState>> = combineReducers<IRootState>(
    {
        userState: userReducer,
        batchState: BatchReducer,
        notificationState: notificationReducer,
        messageState: messageReducer
        //place your state:reducer here
    });
