export interface INotification { //basic structure of the notifications
    clientName:string
    subject:string
    requestDate:string
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
    (state:INotificationState = initialState, action:{type:string, payload:INotification}):INotificationState => {
        switch(action.type) {
            /**
             * !!! May or may not be used, TBD...
             */
            case "GET_NOTIFICATIONS":

                //TODO: make an axios get request here to populate the notification state

                return {notifications: null};
            case "ADD_NOTIFICATION": //Adds a new notification to the state using the payload provided in the action
                if(state == null)
                    return {notifications: null};

                state = {
                    notifications:[
                        ...state.notifications as INotification[],
                        action.payload
                    ]
                };

                return state;
            case "REMOVE_NOTIFICATION": //Removes the payload object from the current state
                if(state == null)
                    return {notifications: null};

                const index = state.notifications?.findIndex((element:INotification) => element = action.payload);

                state.notifications?.splice(index as number, 1) as INotification[];

                return state;
            default:
                return state;
        }
}
