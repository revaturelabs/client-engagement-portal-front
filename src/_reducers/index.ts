import { CombinedState, combineReducers, Reducer } from "redux";
import { BatchReducer } from "./BatchReducer";
import { notificationReducer } from "./NotificationReducer";
import { userReducer } from "./UserReducer";
import { Store } from "../types";
import { messageReducer } from "./MessagesReducer";

/**
 * Combined reducer to be stored in the Redux store for state handling.
 */
export const rootReducer: Reducer<
  CombinedState<Store>
> = combineReducers<Store>({
  userState: userReducer,
  batchState: BatchReducer,
  notificationState: notificationReducer,
  messageState: messageReducer,
  //place your state:reducer here
});
