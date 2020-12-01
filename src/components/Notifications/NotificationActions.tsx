import { INotification } from "../../_reducers/NotificationReducer";

export const setNotifications = (notifs:INotification[]) => {
    return {
        type: "SET_NOTIFICATIONS",
        payload: notifs
    }
};
