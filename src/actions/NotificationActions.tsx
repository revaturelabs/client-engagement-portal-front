import { Notification } from "../types";

export const setNotifications = (notifs:Notification[]) => {
    return {
        type: "SET_NOTIFICATIONS",
        payload: notifs
    }
};
