//basic structure of the notifications
export interface INotification {
    clientName:string
    subject:string
    requestDate:string
}

//state of the notifications
export interface INotificationState {
    notifications:INotification[] | null
}

//basic initial state just to display info
const initialState:INotificationState = {
        notifications: [
        {
            clientName:'a1',
            subject:'a2',
            requestDate:'a3'
        },
        {
            clientName:'b1',
            subject:'b2',
            requestDate:'b3'
        },
        {
            clientName:'c1',
            subject:'c2',
            requestDate:'c3'
        },
    ]
}

export const notificationReducer = 
    (state:INotificationState = initialState, action:{type:string, payload:INotification}):INotificationState => {
        switch(action.type) {
            case "GET_NOTIFICATIONS":

                //TODO: make an axios get request here to populate the notification state

                return {notifications: null};
            case "ADD_NOTIFICATION":
                if(state == null)
                    return {notifications: null};

                state = {
                    notifications:[
                        ...state.notifications as INotification[],
                        action.payload
                    ]
                };

                //TODO: make an axios post request here to add the notification

                return state;
            case "REMOVE_NOTIFICATION":
                if(state == null)
                    return {notifications: null};

                const payload = (element:INotification) => element = action.payload;

                const index = state.notifications?.findIndex(payload);

                state = {
                    notifications: state.notifications?.splice(index as number, 1) as INotification[]
                }

                //TODO: make an axios delete request here to remove the notification

                return state;
            default:
                return state;
        }
}