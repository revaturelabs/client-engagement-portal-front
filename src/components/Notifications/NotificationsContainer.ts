import { connect } from "react-redux";
import { IRootState } from "../../_reducers";
import { INotification } from "../../_reducers/NotificationReducer";
import { Notifications } from "./Notifications";

const mapStateToProps = (state:IRootState) => {
    return {
        notifications: state.notificationState.notifications
    }
}

export interface INotificationActions {
    addNotification:(cName:string, subj:string, date:string) => {type:string, payload:INotification}
    getNotifications:(cName:string, subj:string, date:string) => {type:string, payload:INotification}
    removeNotification:(cName:string, subj:string, date:string) => {type:string, payload:INotification}
}

const mapDispatchToProps:INotificationActions = {
    /**
     * Creates an ADD_NOTIFICATION action
     */
    addNotification:(cName:string, subj:string, date:string) => {
        return {
            type: "ADD_NOTIFICATION",
            payload: {
                clientName: cName,
                subject: subj,
                requestDate: date
            }
        }
    },

    /**
     * Creates a GET_NOTIFICATIONS action
     */
    getNotifications:(cName:string, subj:string, date:string) => {
        return {
            type: "GET_NOTIFICATIONS",
            payload: {
                clientName: cName,
                subject: subj,
                requestDate: date
            }
        }
    },

    /**
     * Creates a REMOVE_NOTIFICATION action
     */
    removeNotification:(cName:string, subj:string, date:string) => {
        return {
            type: "REMOVE_NOTIFICATION",
            payload: {
                clientName: cName,
                subject: subj,
                requestDate: date
            }
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications)