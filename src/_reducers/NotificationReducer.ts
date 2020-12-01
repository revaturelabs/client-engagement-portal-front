export interface INotification { //basic structure of the notifications
    requestId:number
    requestType:string
    status:string
    dateCreated:string
    message:string
    client: {
        clientId:number,
        email:string,
        companyName:string,
        phoneNumber:string
    }
}

export interface INotificationState {
    notifications:INotification[] | null
}

const initialState:INotificationState = {
        notifications: []
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
    ( state:INotificationState = initialState, action:{type:string, payload:INotification[]}):INotificationState => {
        if(action.type === "SET_NOTIFICATIONS") {
            return {
                notifications:[...action.payload]
            };
        }
        else {
            return state;
        }
}
