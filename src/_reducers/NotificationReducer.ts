import { NotificationState, Notification } from '../types';

const initialState:NotificationState = {
        notifications: [],
}

/**
 * This function defines the notification reducer, which updates the notification
 *   state.
 * 
 * @param state the current state of notifications:[], initially set to an empty array.
 * @param action the current action being passed in. If the action is in the reducer, the state will change.
 * 
 * @returns the current state, after possible modifications
 */
export const notificationReducer = 
    ( state:NotificationState = initialState, action:{type:string, payload:Notification[]}):NotificationState => {
        if(action.type === "SET_NOTIFICATIONS") {
            return {
                notifications:[...action.payload]
            };
        }
        else {
            return state;
        }
}
