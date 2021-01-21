import { IMessage } from "../_reducers/MessagesReducer";

export const setMessages = (notifs:IMessage[]) => {
    return {
        type: "SET_MESSAGES",
        payload: notifs
    }
};