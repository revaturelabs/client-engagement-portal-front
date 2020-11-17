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
                //make a request to gather all pending notifications
                break;
            case "ADD_NOTIFICATION":
                //create request for more talent/intervention
                break;
            case "REMOVE_NOTIFICATION":
                //cancel request
                break;
            default:
                return state;
        }

        return state;
}